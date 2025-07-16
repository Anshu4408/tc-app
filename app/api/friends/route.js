
    import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import model1 from "@/models/model1";

export async function PUT(request) {
  
   
       if (!mongoose.connections[0].readyState) {
       await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8%40@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        }
     const { searchParams } = new URL(request.url);
    const frienduser = searchParams.get("friendemail");
  const user = searchParams.get("myemail");
    if (!frienduser || !user) {
        return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }
    const SearchResult = await model1.findOne({ email: user });
    const SearchResult1 = await model1.findOne({ email: frienduser });
     if(!SearchResult1){
    return NextResponse.json({sucess:false,message:"Invalid username"})
   }
    if (!SearchResult) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
   const token = SearchResult._id;
   await model1.findByIdAndUpdate(
        token,
       { $addToSet: { friends: frienduser } },

        { new: true }
    )
    const token1 = SearchResult1._id;

    await model1.findByIdAndUpdate(
        token1,
       { $addToSet: { friends:user } },

        { new: true }
    )
    return NextResponse.redirect("https://tc-app-nu.vercel.app/new/main")
}
