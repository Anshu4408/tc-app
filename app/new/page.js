"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer/footer'
import FNavbar from '../components/finalNav/Nav'
import Loading from '../components/Loader/Loader'


const page = () => {

  const [showform, setshowform] = useState(false)
  const [data, setdata] = useState([])
  const [email, setemail] = useState("")
  const [del, setdel] = useState(0)
  const [Time, setTime] = useState("")
  const [date, setdate] = useState("")
  const [loading, setloading] = useState(false)

  const [update, setupdate] = useState(0)
  
  const handlefriends = async (e, email) => {
    setloading(true);
    const res = await fetch(`/api/friends/?friendemail=${e}&myemail=${email}`, {
      method: "PUT",

    });
    setloading(false);
    if(res.redirected) {
      window.location.href = res.url;
    }

  }
   
  useEffect(() => {
    const interval= setInterval(() => {
     

        const time = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        const today = new Date().toISOString().split('T')[0];
        setdate(today);
        setTime(time)
      }, 10 * 1000)
    

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setloading(true);


    async function fn() {
    
      const res = await fetch("/api/get", {
        method: "GET",
      })
      const Data = await res.json();
      setdata(Data);
      setloading(false);
       
    }
    fn();



  }, [showform, del, update])

  useEffect(() => {
    const allcookie = document.cookie
    const cookieArray = allcookie.split(";")
    const nameCookie = cookieArray.find(e => e.trim().startsWith('email='))
    if (nameCookie) {
      const value = nameCookie.split('=')[1];

      setemail(decodeURIComponent(value))
       const fn= async () => {
      try{
       
        const Res = await fetch(`/api/userSave/?email=${decodeURIComponent(value)}`, {
          method: "POST",
        });
       
   

    }
  catch(err){
    console.log(err);
  }
  
}
 fn();
    }
  }, [])
  const handleClick = async (e) => {
    setloading(true);
    const res = await fetch(`/api/delete?email=${e.email}&title=${e.title}&date=${e.date}&time=${e.Time}`, {
      method: "DELETE",
    })
    setdel(del + 1);
     setloading(false);
  }
  useEffect(() => {
    data.forEach(e => {
      if (e.Time === Time && e.date === date) {
        handleClick(e);
      }
    });
  }, [Time]);

  const handleJoin = async (e) => {
    setloading(true);
    setupdate(update + 1)
    const arr = Array.isArray(e.Joined) ? [...e.Joined] : [];
    if (!arr.includes(email)) {
      arr.push(email);
    }
    const res = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e._id,
        title: e.title,
        PeopleReq: e.PeopleReq,
        date: e.date,
        Time: e.Time,
        Joined: arr,
      }),
    });

    const data = await res.json();
    console.log("Updated:", data);
    setloading(false);
  };
  const handleJoin2 = async (e) => {
    setloading(true);
    setupdate(update + 1)
    let newArr;
    const arr = Array.isArray(e.Joined) ? [...e.Joined] : [];
    if (arr.includes(email)) {
      newArr = arr.filter(item => item !== email);
    }
    const res = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e._id,
        title: e.title,
        PeopleReq: e.PeopleReq,
        date: e.date,
        Time: e.Time,
        Joined: newArr,
      }),

    });

    const data = await res.json();
    console.log("Updated:", data);
    setloading(false);
  };

  return (
    <div>
      <FNavbar />
      {loading && <Loading />}

      <div className="body min-w-[100vw] min-h-[140vh] overflow-y-auto   ">

        <div className="body max-w-[90vw] overflow-y-auto min-h-[110vh] bg-white mx-auto mt-10 rounded-2xl bg-gradient-to-l from-white to-gray-500 pt-3">
          <button onClick={() => {
            setshowform(true)
          }} className=' text-white rounded-sm p-2 text-3xl text-center flex items-center justify-center mx-auto bg-blue-600   hover:bg-blue-800 '><p className='cursor-pointer'>Add new Team</p></button>
          {data.length > 0 &&

            data.map((e, i) => (<>
              <div className='rounded-2xl border-1 bg-gradient-to-l from-white h-[15vh] p-7 mt-3 flex items-center '>

                <p className='text-3xl m-3  '>{e.title}</p>

                <span className='flex items-center absolute mx-[40vh] gap-10'>
                  <p className='text-sm mx-1 w-[10vh] '>Date: <span className='font-bold '>{e.date.substr(5)}</span></p>
                  <p className='text-sm mx-1 w-[10vh] '>Time: <span className='font-bold '>{e.Time}</span></p>
                  <p className='text-sm mx-1'>Created By: <span className='font-bold'>{e.name}</span></p>
                  <p className='text-sm mx-1'>Contact Info: <span className='font-bold'>{e.phone}</span></p>

                  {!(e.Joined.find((num) => num === email)) &&(e.Joined.length < e.PeopleReq) && !(e.email === email)&& (
                    <button className='bg-green-600 text-white text-lg pl-4 pr-4 rounded-sm  cursor-pointer' onClick={() => {
                      handleJoin(e);
                    }}>Join</button>
                  )}
                  {(e.Joined.find((num) => num === email)) && (
                    <button className='bg-red-500 text-white text-lg pl-4 pr-4 rounded-sm  cursor-pointer' onClick={() => {
                      handleJoin2(e);
                    }} >Leave</button>
                  )}

                  {(e.email === email) && (
                    <button className='bg-red-500 text-white text-lg pl-4 pr-4 rounded-sm  cursor-pointer' onClick={() => {
                      handleClick(e);
                    }}>Delete</button>
                  )}
                  {!(e.email === email)&&(<>
                    <button className='bg-blue-500 text-white text-lg pl-4 pr-4 rounded-sm  cursor-pointer' onClick={() => {
                    handlefriends(e.email,email);

                  }}>Message</button>
                  </>)}
                
          
                  <p>{e.Joined.length}/{e.PeopleReq && (e.PeopleReq)}{!e.PeopleReq && (0)}</p>
                </span>

              </div>



            </>
            ))


          }

        </div>


        {showform && (
          <>
            <div className='bg-blue-500 text-white fixed top-[25vh] ml-[15vw] w-[70vw] h-[50vh] rounded-2xl flex justify-center items-center'>
              <form className='flex flex-col  items-center justify-center text-[4vw] lg:text-lg ' method="POST" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const res = await fetch("/api/add", {
                  method: "POST",
                  body: formData,
                });
                if (res.ok) {
                  setshowform(false);
                  setupdate(update + 1);
                } else {
                  console.error("Failed to add data");
                }
              }}>
                <label htmlFor="title"></label>
                <input id="title" name="title" className='border-1 text-center m-4 rounded-sm max-w-[25vw]' type="text" placeholder='Title' required={true} />
                <span><label htmlFor='PeopleReq'></label><input className='border-1 text-center m-4 rounded-sm max-w-[25vw]' type="number" name="required" placeholder="Number of people required" required={true} /></span>

           <label htmlFor="time">Expires till :</label>

                  <input id='time' name="time" className=' sm:text-[3vw] border-1 text-center rounded-sm' type="time" required={true}/>
                  <label htmlFor="date"></label>
                  <input id="date" className='border-1 text-center rounded-sm sm:text-[3vw]' type="date" name="date" required={true}/>


                <input className='border-1 text-center m-4 rounded-sm w-1/3 mx-auto sm:text-[3vw] bg-white text-blue-700 hover:bg-blue-300 cursor-pointer' type="submit" value="Add" />
              </form>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default page
