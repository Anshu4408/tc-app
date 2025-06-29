import Image from "next/image";
import "./page.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
export default function Home() {
  return (
    <>
    <Navbar/>
<div className="flex  items-center p-7 " >
  <p className="text-6xl my-10 text-white flex flex-col"><span className="text-8xl ">Welcome to NITTeamly, </span><span className="mt-10 mx-60">From <span className="text-green-700 font-bold">Strangers </span>to Teammates — Instantly.</span></p>
 
</div>
<div className="flex justify-center items-center">

<p className="text-white text-4xl mx-10 font-bold">NITTeamly brings Trichy minds together.
Create, join, and collaborate — effortlessly.</p> <img className=" w-[30vw] mx-[10]" src="/5551.jpg"/>
</div>
<p className="text-white text-2xl p-4"> Group up smarter at NIT Trichy.
Find teammates, projects, and friends — all in one place.</p>
<p className="text-white text-2xl p-4">Your team. Your terms.
From hostel rooms to hackathons, NITTeamly makes group formation simple.</p>
<Footer/>
    </>
  );
}
