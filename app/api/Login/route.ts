import { NextRequest,NextResponse } from "next/server";
import { signSchema } from "@/app/(auth)/auth/login/page";
import User from "@/models/UserDetials";
import bcrypt from 'bcryptjs';

export async function POST(req : NextRequest,res : NextResponse) {
    const {email,password} = await req.json();
    
    try {
        const userCheck = await User.findOne({email : email});
        
        if(userCheck && await bcrypt.compare(password,userCheck.password)){
            return NextResponse.json()
        }

    } catch (error) {
        
    }
}


