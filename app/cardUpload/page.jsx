import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { API_URL } from "../config/index";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { UploadImage } from "../libs/uploadImg";
function PhotoUpload() {
  const router = useRouter();
  const { pending } = useFormStatus();

  const addPost = async (prevState, formData) => {
    
    let { idCard } = Object.fromEntries(formData);

    const uploadImg = await UploadImage(idCard, "linkstracker");
    console.log(uploadImg);

    let { secure_url } = uploadImg;
    const values = {
      id: Cookies.get("id"),
      onlyCard: secure_url,
    };
    console.log(values);

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
      router.push("/photoUpload");
    } else {
      console.log("error", data);
     
    }
  };
  const [state, formAction] = useFormState(addPost);

  return (
    <form action={formAction}>
      <div className="absolute inset-0 bg-white h-screen">
        <nav className=" w-full px-3 py-2 bg-[#ff2aac]">
          <div className="flex justify-center items-center ">
            <img src="/images/megalogo.png" width={237} height={40} />
          </div>
        </nav>
        <div className="flex flex-col justify-start items-center h-full">
          <div className=" rounded-md bg-white  overflow-hidden ">
            <div className="mx-5 my-6 flex flex-col items-center gap-5">
              <h1 className="text-[22px] font-semibold  text-gray-700">
                Upload back Of the ID Card
              </h1>

              <div className="relative w-[460px] h-[320px]">
                <Image
                  alt="id image"
                  src="/images/photo-id-sample.png"
                  fill
                  className="object-cover"
                />
              </div>

              <input type="file" id="idCard" name="idCard" />
              <div className=" m-3 flex flex-col justify-center items-center">
                <button
                  type="submit"
                  disabled={pending}
                  className=" text-white px-4 py-2 bg-[#198754] rounded-md mb-3"
                >
                  {pending ? "Submitting..." : "Submit ID"}
                </button>
                <img src="/images/footer-logo.png" width={64} height={64} />
                <p className="text-normal font-semibold">
                  Copyright © 2022 Age Smart LDA. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PhotoUpload;
