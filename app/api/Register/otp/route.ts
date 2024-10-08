import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/dbConnection';
import { z } from 'zod';
import { emailSchema } from '@/components/steppers/FormSchemas';
import nodemailer, { Transporter } from 'nodemailer';
import User from '@/models/UserDetials';

interface addDataType {
  email : string,
  otp : string,
  otpExpiration : Date;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data)
    const validation = emailSchema.parse(data);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 3 * 60 * 1000); 
    
    const adddata = {
      email : data.email,
      otp : otp,
      otpExpiration : otpExpiration
    }
  
    const user = await dbwork(adddata);//here connecting the db and 
    console.log(user._id);
    const userToken = user._id;
    await sendMail(data.email,"Your OTP is here",`${otp}`)
    const response =  NextResponse.json({ status: 200,success:true})
    response.cookies.set('UserId', userToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== 'development',
      maxAge: 3600*6, // 6 hour
      sameSite: 'strict',
      path: '/',
    });
    return response;
    }
  catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ success: false, errors: error.errors }), { status: 400 });
    }
    return NextResponse.json({ status: 500, sucess: false, message: "Internal server error" })
  }
}  

const dbwork = async(data:addDataType)=>{
    try {
      await dbConnect(); // Ensure that the database is connected

      const userState = await User.findOneAndUpdate(
        { email: data.email },  // Search by email
        { $set: { email: data.email, otp: data.otp, otpExpiration: data.otpExpiration } },
        { new: true, upsert: true } // 'upsert' creates a new doc if no match is found
      );
      return userState;
    } catch (error) {
      console.log("db connection error :",error)
      throw(error)
    }
}

const sendMail = async(to:string,subject:string,text:string)=>{
  try {
     console.log("sending mail..",to,subject,text)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  logger: true
});
  const mailOptions : nodemailer.SendMailOptions ={
    from:"sidsharma112001@gmail.com",
    to: to, 
    subject: subject,
    text: text, 
  };
  await transporter.sendMail(mailOptions);
  return "otp has been sent";
  } catch (error) {
    console.log(error)
    // return new Error(error)
  }
}
