import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import model1 from '@/models/model1';
export async function DELETE(req) {
    if (!mongoose.connections[0].readyState) {
       await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8@@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
   }
    const { searchParams } = new URL(req.url);

const email = searchParams.get("email");
const title = searchParams.get("title");
const date = searchParams.get("date");
const time = searchParams.get("Time");
const result=await model1.deleteOne({ email,title,date,time });
   if (result.deletedCount === 0) {
      return NextResponse.json({ message: "No matching document found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  
}