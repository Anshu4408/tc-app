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
<div className="flex  min-w-[100vw] min-h-[100vh]   bg-[url('/bgtc_upscaled.jpg')] bg-cover bg-center h-screen custom-font  " >
<div>
  <p className="text-6xl  text-white flex flex-col  custom-font">
    <span className="text-8xl custom-font mt-20 ml-[23vw] ">Welcome to NITTeamly, </span>
    <span className=" mt-30 ml-90 absolute bottom-[-110]">From 
      <span className="text-blue-700 font-bold">Strangers 
        </span>to Teammates — Instantly.</span>
        </p>
 
 </div>
  {/* 
</div>
<div className="flex justify-center items-center  custom-font">

<p className=" text-4xl mx-10 font-bold">NITTeamly brings Trichy minds together.
Create, join, and collaborate — effortlessly.</p> 
</div>
<p className=" text-2xl p-4"> Group up smarter at NIT Trichy.
Find teammates, projects, and friends — all in one place.</p>
<p className=" text-2xl p-4">Your team. Your terms.
From hostel rooms to hackathons, NITTeamly makes group formation simple.</p> */}
</div>
<Footer/>
    </>
  );
}
