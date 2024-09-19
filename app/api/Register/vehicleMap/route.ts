import { NextRequest,NextResponse } from "next/server";
import User from "@/models/UserDetials";
import dbConnect from "@/lib/db/dbConnection";

export async function POST(request:NextRequest){
    try {
        const vehicles = await request.json();
        const cookies = request.cookies;
        const _id = cookies.get('UserId')?.value;
        console.log(vehicles.vehiclesMap,_id);

        if(!_id){
            return NextResponse.json({status : 200, sucess:false})
        } 

        dbConnect();

        const userState = await User.findByIdAndUpdate(_id,{vechileMap:vehicles.vehiclesMap.vehiclesMap,step:3},{new : true})
        console.log(userState)
        return NextResponse.json(userState,{status:200});
    } catch (error) {
    //     if(error instanceof z.ZodError){
    //    const formattedError = error.errors.map(err =>({
    //     path:err.path.join('.'),
    //     message :err.message,
    //    })) 
    console.log(error)
       return NextResponse.json({success :false},{status:409});
    }
}



