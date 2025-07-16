import mongoose from "mongoose";
import model1 from "@/models/model1";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { WebSocketServer } from "ws";


 

if (!globalThis.wss) {
 
   
    const wss = new WebSocketServer({ port: 8080 });
    globalThis.wss = wss;
    globalThis.clients = new Map();


    wss.on("connection", (ws, request) => {
      
        const { searchParams } = new URL(request.url, "https://tc-app-nu.vercel.app");
        const username = searchParams.get("username");
      
        console.log("New client connected");
       
        globalThis.clients.set(username, ws);
        
       
       
    })

}


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
    const user = await model1.findOne({ email: token });
    const otheruser = await model1.findOne({ email: username });

    if (user) {

            for (const [uname, socket] of globalThis.clients.entries()) {
                
                if (socket.readyState === 1 && (uname === username || uname === token)) {
                    socket.send(`${token}: ${data}`);
                   const update= await model1.findOneAndUpdate(
                        { email: uname },
                        { $push: { messages:`${token}: ${data}`  } },
                        { new: true }
                    );
                    const update2 = await model1.findOneAndUpdate(
                        { email: token },
                        { $push: { messages: `${uname}: ${data}` } },
                        { new: true }
                    );
                }
              
            }


        

    }
   


    return NextResponse.json({ message: "SENT" })

}