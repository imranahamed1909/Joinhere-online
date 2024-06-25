import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:"dhgjgbcuy",
  api_key: "123753362727452",
  api_secret:"yRVHBUU-YPImF-h7w6uCFGl810s",
  secure: true
});

export const UploadImage=async(file,folder)=>{
    const arrayBuffer=await file.arrayBuffer()
    const bytes=Buffer.from(arrayBuffer)
   

    return new Promise(async(resolve,reject)=>{
        await cloudinary.uploader.upload_stream({
            resource_type:"auto",
            folder:folder
        },async(err,result)=>{
            if(err){
                reject(err.message)
            }
            resolve(result)
        }).end(bytes)
    })
}