import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import User from '@/models/UserDetials';
import { otpSchema } from '@/components/steppers/FormSchemas';
import dbConnect from '@/lib/db/dbConnection';
export async function POST(request : NextRequest){
try {
    const body = await request.json();
    const cookies = request.cookies;
   console.log(cookies)
    const _id = cookies.get('UserId')?.value;
    console.log(_id)
    const validate = otpSchema.parse(body.registerData);
    console.log(validate)
    const {otp,email} = body;
    
     await dbConnect();

    const user = await User.findById(_id).select('otp otpExpiration');

    if(!user){
        console.log("error user not found")
    }

    if(user.otp !== otp && user.otpExpiration < Date.now && user.email === email){
        console.log('otp is not valid')
    }

    const userState = await User.findByIdAndUpdate(_id, { otp: null , otpExpiration: null, step:2},{new:true}).exec();    
    return NextResponse.json(userState,{status:200});
} catch (error) {
    console.log(error)
    if(error instanceof z.ZodError){
       const formattedError = error.errors.map(err =>({
        path:err.path.join('.'),
        message :err.message,
       })) 
       return NextResponse.json({success :false, error: formattedError},{status:400});
    }
    return NextResponse.json({sucess: false,message:"error while registering"},{status:500});
}
}