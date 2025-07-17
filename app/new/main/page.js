"use client"

import React from 'react'
import { useState, useEffect,useRef } from 'react'

const page = () => {
    const [email, setemail] = useState("")
    const socketRef = useRef(null);
    const [OldMessages, setOldMessages] = useState([])
    const [update, setupdate] = useState(0)
    const [currmessage, setcurrmessage] = useState("")
    const [friend, setfriend] = useState("Select a Friend to Chat")
     const [message, setmessage] = useState("")
     const [Messages, setMessages] = useState([])
    const [Data, setData] = useState([])
         const connectwebSocket = (req) => {
             if (socketRef.current) {
        socketRef.current.close();
    }
            const socket = new WebSocket(`wss://socket-server-nextjs.onrender.com/api/?username=${req}&myusername=${encodeURIComponent(email)}`);
                socketRef.current = socket;
            socket.onopen = () => {
                console.log("WebSocket connection established");
            };
            socket.onmessage = (event) => {
                setMessages(prev => [...prev, event.data]);

                
                console.log("Message from server:", event.data);
            };
            socket.onclose = () => {
                console.log("WebSocket connection closed");
            };
        }
    useEffect(() => {
         const allcookie = document.cookie
    const cookieArray = allcookie.split(";")
    const nameCookie = cookieArray.find(e => e.trim().startsWith('email='))
    if (nameCookie) {
      const value = nameCookie.split('=')[1];

      setemail(decodeURIComponent(value))
    }
   
        const fn = async () => {
            try {

                const res = await fetch('/api/friendreq', {
                    method: 'GET',
                });
                const data = await res.json();
                console.log(data);
                setData(data.data);
                setOldMessages(data.data.messages || []);
                setMessages(data.data.messages || []);


            }
            catch (err) {
                console.log(err);
            }

        }
        fn();
      

    }, [update]);
      

 
    
    return (<>
        <div className='flex  h-[100vh] w-[100vw] p-0'>
            
            
            <div className='w-[10vw] bg-blue-500 border-r-1 border-blue-300 flex justify-center pt-8'>
                <ul className=' flex flex-col gap-5'>
                    <li className='bg-blue-600 p-2 rounded-sm '><img src='/bubble-chat.png' className='w-[3vw] invert-100'></img></li>
                    
                </ul>
            </div>

            <div className='bg-gradient-to-r from-blue-400 to-blue-400  h-[100vh] font text-white w-1/2 border-r-1 border-blue-200'>
                <p className='text-lg font-bold ml-5 mt-5 mb-3'>Chats</p>
               <div className='border-1  rounded-sm mx-auto  text-center w-full'>Start Chat Now</div>
                 {Array.isArray(Data?.friends) && Data.friends.length > 0 ? (

                            Data.friends.map((req, index) => (

                                <div key={index} className='mt-5 flex justify-between items-center bg-blue-500 p-2 w-full  cursor-pointer overflow-y-scroll' onClick={() => { setfriend(req) 
                                    connectwebSocket(req);

                                }}>
                                    <div className='mr-4'>{req}</div>
                             
                                </div>
                            ))
                        ) : (
                            <p>No Friends </p>
                        )}
            </div>
            <div className='w-full'>
                <div className='h-[7vh] bg-blue-500 border-b-1 border-white font text-center p-4 text-2xl text-white'>{friend}</div>
                <div className='h-[93vh] bg-blue-500'>

                <div className=" bg-[url('/whatsapp.png')] bg-cover bg-center h-[86vh] w-full overflow-y-scroll"
               >
                <div className='h-[80vh] w-full gap-5 overflow-y-scroll p-4 '>
                    
                        {friend !== "Select a Friend to Chat" && OldMessages.map((msg, i) => {
                    const parts = msg.split(":");
                    const sender = parts[0];
                    if (sender === friend) {
                        return (
                            <>
                            <div key={i} className='p-2 bg-blue-400 rounded shadow mb-1 max-w-[20vw] ml-200 mr-10'>
                                {msg}
                            </div>
                            </>
                        )
                    }
                    return (
                    <div key={i} className='p-2 bg-blue-400 rounded shadow mb-1 max-w-[10vw] mr-10'>
                        {msg}
                    </div>
                )})}

                {friend !== "Select a Friend to Chat" && Messages.map((msg, i) => {
                    const parts = msg.split(":");
                    const sender = parts[0];
                    if (sender === friend) {
                        return (
                            <>
                            <div key={i} className='p-2 bg-blue-400 rounded shadow mb-1 max-w-[20vw] ml-200 mr-10'>
                                {msg}
                            </div>
                            </>
                        )
                    }
                    return (
                    <div key={i} className='p-2 bg-blue-400 rounded shadow mb-1 max-w-[10vw] mr-10'>
                        {msg}
                    </div>
                )})}
                </div>
                
                {message && (
                    <div className='text-white text-2xl text-center mt-5'>{message}</div>
                )}
                {friend!=="Select a Friend to Chat" && (
                    
                    <form className='flex  gap-2 p-5 fixed bottom-[-10] w-[60vw] 'onSubmit={(e) => {
                         e.preventDefault();

                    const formdata = new FormData();
                    formdata.append("username", friend);
                    formdata.append("message", currmessage);
                   
                    setcurrmessage("");
                    fetch(`/api/connect`, {
                        method: "PUT",
                        body: formdata,
                    }).then(res => res.json()).then(data => {
                        console.log(data);
                        setmessage("");
                    }).catch(err => console.error(err));
                }} >

                    <input type='text' className='text-2xl text-center bg-blue-400   border-1 border-white h-[4vh] w-full' value={currmessage} onChange={(e) => { setcurrmessage(e.target.value) }} placeholder='Message' />
                   
                    <input type='submit' className=" cursor-pointer  rounded-full  mx-auto bg-[url('/1564528_fly_messager_send_communication_email_icon.png')] bg-cover bg-center  " value="        " 
                      
                 />
                </form>
            )}
                </div>


                </div>
            </div>
            
        </div>
    </>
    )
}

export default page
