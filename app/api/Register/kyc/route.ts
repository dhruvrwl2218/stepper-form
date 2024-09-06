// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import formidable, { File, Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingMessage } from 'http';
import User from '@/models/UserDetials';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to parse form data
const parseForm = (req: NextRequest): Promise<{ fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      keepExtensions: true,
      uploadDir: path.join(process.cwd(), '/public/uploads'), // Directory to save the files
      multiples: true,
    });

    form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        reject(new Error('Failed to parse form data'));
      } else {
        resolve({ fields, files });
      }
    });
  });
};

// // Function to upload file to Cloudinary
const uploadToCloudinary = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

export async function POST(request: NextRequest) {
  try {
    // const userId = request.cookies.get('userId')?.value;
    // if(!userId){
    //   console.log("id doesn't recieved in the cookies")
    //   throw Error("Plz go to step one and register with no.")
    // }
    // Parse form data
    console.log(request)
    const { files } = await parseForm(request);
    console.log(files)
    // Ensure files are present
    const addressProofFront = files.addressProofFront as File | File[] | undefined;
    const addressProofBack = files.addressProofBack as File | File[] | undefined;
    
    console.log("adf:",addressProofFront,"adb:",addressProofBack)
//     //here before uploading the files do check the is there are files already and what if this step
//     // was filled again than in that case get the url stored and dlt tht file
   
//     // Object to hold uploaded file URLs
//     const uploads: { image1Url?: string; image2Url?: string } = {};

//     // Handle file upload to Cloudinary
//     if (addressProofFront) {
//       const file = Array.isArray(addressProofFront) ? addressProofFront[0] : addressProofFront;
//       if (file instanceof File) {
//         const imageUrl = await uploadToCloudinary(file.filepath);
//         uploads.image1Url = imageUrl;
//       }
//     }

//     if (addressProofBack) {
//       const file = Array.isArray(addressProofBack) ? addressProofBack[0] : addressProofBack;
//       if (file instanceof File) {
//         const imageUrl = await uploadToCloudinary(file.filepath);
//         uploads.image2Url = imageUrl;
//       }
//     }
//    const kycDetails = await User.findByIdAndUpdate(userId,
//     {$set:{}}
//    )
    // Return success response with uploaded URLs
    return NextResponse.json({ message: 'Files uploaded successfully'});

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
