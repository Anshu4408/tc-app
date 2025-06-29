import mongoose from "mongoose";
import model1 from "@/models/model1";
import { NextResponse } from "next/server";
export async function GET(){

   
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect("mongodb://mongo:27017/tcdata");
    }
        const allGroups = await model1.find();
        return NextResponse.json(allGroups)


}