import { NextResponse } from "next/server";
import mongoose from "mongoose";
import userModel from "@/models/userModel";
import { cookies } from "next/headers";
export async function POST(request) {
  await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8%40@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;

  const formData = await request.formData();
  const newUser = new userModel({
    email: email,
   
  });

  await newUser.save();

  return NextResponse.json({ message: "User saved successfully" });
}