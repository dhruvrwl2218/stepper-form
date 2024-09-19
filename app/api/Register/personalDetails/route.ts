import { NextRequest,NextResponse } from "next/server";
import User from "@/models/UserDetials";
import { PersonalDetailsSchema } from "@/components/steppers/FormSchemas";
import { z } from "zod";
import dbConnect from "@/lib/db/dbConnection";

const baseSchema = PersonalDetailsSchema._def.schema; // Extract the base schema
const Updatedschema = baseSchema.partial({ confirmPassword : true });
export async function POST(request : NextRequest){
    try {
        const cookies = request.cookies;
        const {PersonalData} = await request.json();
        const _id = cookies.get('UserId')?.value;

        // console.log("body recieved :",PersonalData)
        const validate = Updatedschema.parse(PersonalData);
        console.log(validate);

        dbConnect();
        const updatedStep2 = await User.findByIdAndUpdate(_id,{PersonalData,step : 5},{new:true}).exec();
        console.log(updatedStep2)
        return NextResponse.json(updatedStep2,{status:200});

    } catch (error) {
        if(error instanceof z.ZodError){
       const formattedError = error.errors.map(err =>({
        path:err.path.join('.'),
        message :err.message,
       })) 
       return NextResponse.json({success :false, error: formattedError},{status:409});
    }
    }
}

    
    
