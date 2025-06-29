import mongoose from 'mongoose'
import model1 from '@/models/model1';
import { NextResponse } from 'next/server';
export async function PUT(request){

     if (!mongoose.connections[0].readyState) {
           await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8%40@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
       }
         const body = await request.json(); 
  const { id, title, PeopleReq, date, Time ,Joined} = body;

  try {
    const updated = await model1.findByIdAndUpdate(
      id,
      { title, PeopleReq, date, Time,Joined },
      { new: true }
    );

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}