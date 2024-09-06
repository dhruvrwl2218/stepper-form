import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserDetials";
import { BankDetailsSchema } from "@/components/steppers/FormSchemas";
import { z } from "zod";
import dbConnect from "@/lib/db/dbConnection";

// Assuming BankDetailsSchema is a ZodEffects wrapping a ZodObject
const baseSchema = BankDetailsSchema._def.schema; // Extract the base schema
const Updatedschema = baseSchema.omit({ ConfirmBankAccNo: true });

export async function POST(request: NextRequest) {
    try {
        const {BankData} = await request.json();
        const cookies = request.cookies;
        const _id = cookies.get('UserId')?.value;
        console.log("aagya ji sb aa dekhlo",BankData,_id);

        const validate = Updatedschema.parse(BankData);

        console.log('validate:', validate);

        dbConnect();
        const updatedStep2 = await User.findByIdAndUpdate(_id,{BankData},{new:true}).exec();

        return NextResponse.json(updatedStep2,{ status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedError = error.errors.map(err => ({
                path: err.path.join('.'),
                message: err.message,
            }));
            return NextResponse.json({ success: false, error: formattedError }, { status: 400 });
        }
    }
}
