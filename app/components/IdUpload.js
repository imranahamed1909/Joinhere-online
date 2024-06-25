"use client";
import React from "react";
import { useRouter } from "next/navigation";
export default function IdUpload() {
  const route = useRouter();

  return (
    <div className="absolute inset-0 bg-white h-screen">
      <nav className=" w-full px-3 py-2 bg-[#ff2aac]">
        <div className="flex justify-center items-center ">
          <img src="/images/megalogo.png" width={237} height={40} />
        </div>
      </nav>
      <div className="flex flex-col justify-start items-center h-full">
        <div className=" rounded-md bg-white  overflow-hidden ">
          <div className="mx-5 my-6 flex flex-col items-center gap-5">
            <div className="relative w-[240px] h-[50px]">
              <img
                alt="id image"
                src="/images/logo-color.png"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl mt-3 font-semibold text-[#198754] ">
                SUCCESS!
              </p>
              <p className="text-xl mt-3 font-base">
                Thanks For your Trust in our Service
              </p>
              <p className="text-base w-[600px] mt-3">
                Thank you for submitting your information. We appreciate your
                cooperation. Our team will carefully review the details provided
                and confirm your submission within the next 48 hours. If any
                further information is required, we will reach out to you
                promptly.
              </p>
            </div>

            <div className=" m-3 flex flex-col justify-center items-center">
              <img src="/images/footer-logo.png" width={64} height={64} />
              <p className="text-normal font-semibold">
                Copyright © 2022 Age Smart LDA. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
