import mongoose from "mongoose";
import model1 from "@/models/model1";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request){
   if (!mongoose.connections[0].readyState) {
  await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8%40@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}
 const cookieStore = cookies();
    const name = await cookieStore.get("name")?.value;
  const phone = await cookieStore.get("phone")?.value;
  const email = await cookieStore.get("email")?.value;
    const formdata=await request.formData();

    const data=new model1({
        title:formdata.get("title"),
         PeopleReq:formdata.get("required"),
    date:formdata.get("date"),
    Time:formdata.get("time"),
    name:name,
    phone:phone,
    email:email,
    Joined:[],

    })
    await data.save();
    return NextResponse.redirect("https://tc-app-ssgz.onrender.com/new");

}