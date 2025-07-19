"use client";
import "./page.css";
import { useState,useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Loading from "./components/Loader/Loader";
export default function Home() {
   const [fontLoaded, setFontLoaded] = useState(false);
   useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);
  if (!fontLoaded) {
    return <Loading />;
  }
  return (
    
    <>
    <Navbar/>
    <link
  href="https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400..800&family=Bebas+Neue&family=Orbitron:wght@400..900&display=swap"
  rel="stylesheet"
/>
<div className="flex  min-w-[100vw] max-h-[100vh]    bg-black h-screen custom-font  " >
<img src="/bgtc_upscaled.jpg" className="absolute  mx-auto  h-[60vw] mt-[10vh] ml-[1vw] " />
<div className="mx-auto">

  
  <p className=" text-2xl md:text-4xl lg:text-6xl  text-white flex flex-col  custom-font">
    <span className="text-4xl md:text-6xl lg:text-8xl custom-font mt-20 mx-auto relative z-10 ">Welcome to NITTeamly, </span>
    <span className=" mt-30  mx-auto relative top-[20vh] md:top-[34vh] lg:top-[70vh] ">From 
      <span className="text-blue-700 font-bold"> Strangers  
        </span> to Teammates — Instantly.</span>
        </p>
 
 </div>
 
</div>
<Footer/>
    </>
  );
}
