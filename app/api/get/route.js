import mongoose from "mongoose";
import model1 from "@/models/model1";
import { NextResponse } from "next/server";
export async function GET(){

   
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8@@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    }
        const allGroups = await model1.find();
        return NextResponse.json(allGroups)


}