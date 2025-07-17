import mongoose from "mongoose";
import userModel from "@/models/userModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {

    await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8%40@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    const cookieStore = await cookies();
    const cookie = cookieStore.get('username');
    const token = decodeURIComponent(cookie?.value);
        console.log(token)
    const formdata = await request.formData();

    const username = decodeURIComponent(formdata.get("username") );
    console.log(username)
    let data = formdata.get("message");
    if(!data)data="Connected"
    const user = await userModel.findOne({ email: token });
    const otheruser = await userModel.findOne({ email: username });
     console.log(user, otheruser)
    if (!user || !otheruser) {
        console.log("User not found");
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    
            


      
 return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
    }
  


    

