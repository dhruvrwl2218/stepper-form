import {NextRequest,NextResponse} from 'next/server';
import User from '@/models/UserDetials';
import { error } from 'console';

const vechileList = async(request :NextRequest)=>{
    try {
        const body = await request.json();
        const {UserInfo} = body;
        if(body.UserInfo.vechileMapping.length == 0 ){
        throw error
    }
    const updatedUser = await User.findByIdAndUpdate(UserInfo._id,
            {$set: UserInfo.vechileMapping},
            {new :true,runValidators :true}
        )
        if(!updatedUser){
            throw error 
        }
        return NextResponse.json({status:200,data :updatedUser,message:"vechile mapping added",success:true})
    } catch (error) {
        return NextResponse.json({})
    }

}