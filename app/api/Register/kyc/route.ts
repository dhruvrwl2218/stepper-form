// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import User from '@/models/UserDetials';
import { Upload } from 'lucide-react';
import { resolve } from 'path';
import { rejects } from 'assert';

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any
}
type FileUploadType = { [key: string]: File };
export async function POST(request : NextRequest) {
  try {
    const formData = await request.formData();
    const cookies = request.cookies;
    const _id = cookies.get('UserId')?.value;
    console.log(formData)
    const panName = formData.get('panName') as string;
    const panNumber = formData.get('panNumber') as string;
    const panCard = formData.get('panCard') as File | null;
    const addressProofFront = formData.get('addressProofFront') as File | null;
    const addressProofBack = formData.get('addressProofBack') as File | null;

    const FileUpload: FileUploadType[] = [];
    if(panCard){
      FileUpload.push({panCard:panCard})
    }
    if(addressProofFront){
      FileUpload.push({addressProofFront:addressProofFront })
    }
    if(addressProofBack){
      FileUpload.push({addressProofBack:addressProofBack })
    }

    const public_id = await filesPublicId(FileUpload)
    console.log('final ids:',public_id)
    
    const userState = await User.findByIdAndUpdate({_id},{...public_id,step:4,panNumber,panName},{new:true}).exec();;
    console.log(userState)
    return NextResponse.json(userState,{status : 200})
  } catch (error) {
    console.log(error)

    return NextResponse.json({status:500})
  }
}

//send the files and get the files uploaded in the cloud
const CloudUpload = async(file:File)=>{
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
 
  const result = await new Promise<CloudinaryUploadResult>(
    (resolve,reject)=>{
      const uploadStream = cloudinary.uploader.upload_stream(
        {folder : "kyc-stepper"},
        (error,result)=>{
          if(error) reject(error);
          else resolve(result as CloudinaryUploadResult)
        }
      )
      uploadStream.end(buffer)
    }
  )
  console.log(result.public_id)
  return result.public_id;
}

const filesPublicId = async(files : FileUploadType[])=>{
  const uploadDetailsArray = await Promise.all(
    files.map(async(file)=> {
      const key = Object.keys(file)[0]
      console.log(key)
      const value = file[key] 
      // console.log('in map',value)
      const public_id = await CloudUpload(value);
      // console.log(public_id);
      return {[key] : public_id}
    })
  )
  // Convert the array of objects into a single object
const uploadDetails = uploadDetailsArray.reduce((acc, curr) => {
  const key = Object.keys(curr)[0];
  acc[key] = curr[key];
  return acc;
}, {});
  return uploadDetails
}

