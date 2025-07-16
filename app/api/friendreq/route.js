import { NextResponse } from "next/server";
import mongoose from "mongoose"
import { cookies } from "next/headers";
import model1 from "@/models/model1";
export async function GET() {
   if (!mongoose.connections[0].readyState) {
   await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8%40@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    }
      const cookieStore = cookies(); 
  const cookie =  cookieStore.get('username'); 
  const token = decodeURIComponent(cookie?.value);
     console.log(token);
  const SearchResult = await model1.findOne({ email: token });
  console.log(SearchResult)
 
 if (SearchResult) {
        return NextResponse.json({found:"true",data: SearchResult });
    }
    
}