import { NextResponse } from "next/server";
import mongoose from "mongoose";
import userModel from "@/models/userModel";
import { cookies } from "next/headers";
export async function POST(request) {
  await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8%40@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
 const{searchParams} = new URL(request.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }               
  const newUser = new userModel({
    email: email,
   
  });

  await newUser.save();

  return NextResponse.json({ message: "User saved successfully" });
}