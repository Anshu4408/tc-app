"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer/footer'
import FNavbar from '../components/finalNav/Nav'

const page = () => {
  const [showform, setshowform] = useState(false)
  const [data, setdata] = useState([])
  const [email, setemail] = useState("")
  const [del, setdel] = useState(0)
  const [Time, setTime] = useState("")
  const [date, setdate] = useState("")

  const [update, setupdate] = useState(0)
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


    async function fn() {
      const res = await fetch("/api/get", {
        method: "GET",
      })
      const Data = await res.json();
      setdata(Data);
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
    }
  }, [])
  const handleClick = async (e) => {
    const res = await fetch(`/api/delete?email=${e.email}&title=${e.title}&date=${e.date}&time=${e.Time}`, {
      method: "DELETE",
    })
    setdel(del + 1);

  }
  useEffect(() => {
    data.forEach(e => {
      if (e.Time === Time && e.date === date) {
        handleClick(e);
      }
    });
  }, [Time]);

  const handleJoin = async (e) => {
    setupdate(update + 1)
    const arr = Array.isArray(e.Joined) ? [...e.Joined] : [];
    if (!arr.includes(e.email)) {
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
  };
  const handleJoin2 = async (e) => {
    setupdate(update + 1)
    let newArr;
    const arr = Array.isArray(e.Joined) ? [...e.Joined] : [];
    if (arr.includes(e.email)) {
      newArr = arr.filter(item => item !== e.email);
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
  };

  return (
    <div>
      <FNavbar />

      <div className="body min-w-[100vw] min-h-[140vh]   ">

        <div className="body max-w-[90vw] min-h-[110vh] bg-white mx-auto mt-10 rounded-2xl bg-gradient-to-l from-white to-gray-500 pt-3">
          <button onClick={() => {
            setshowform(true)
          }} className=' rounded-sm p-2 text-3xl text-center flex items-center justify-center mx-auto bg-green-600  text-black hover:bg-green-800 '><p className='cursor-pointer'>Add new Team</p></button>
          {data.length > 0 &&

            data.map((e, i) => (<>
              <div className='rounded-2xl border-1 bg-gradient-to-l from-white h-[15vh] p-7 mt-3 flex items-center '>

                <p className='text-3xl m-3  '>{e.title}</p>

                <span className='flex items-center absolute mx-[40vh] gap-10'>
                  <p className='text-sm mx-1 w-[10vh] '>Date: <span className='font-bold '>{e.date.substr(5)}</span></p>
                  <p className='text-sm mx-1 w-[10vh] '>Time: <span className='font-bold '>{e.Time}</span></p>
                  <p className='text-sm mx-1'>Created By: <span className='font-bold'>{e.name}</span></p>
                  <p className='text-sm mx-1'>Contact Info: <span className='font-bold'>{e.phone}</span></p>

                  {!(e.Joined.find((num) => num === email)) && (
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

                  <p>{e.Joined.length}/{e.PeopleReq && (e.PeopleReq)}{!e.PeopleReq && (0)}</p>
                </span>

              </div>



            </>
            ))


          }

        </div>


        {showform && (
          <>
            <div className='bg-white absolute top-[50vh] mx-[30vw] w-[50vw] h-[30vh] rounded-2xl flex justify-center items-center'>
              <form className='flex flex-col  ' method="POST" onSubmit={async (e) => {
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
                <input id="title" name="title" className='border-1 text-center m-4 rounded-sm' type="text" placeholder='Title' />
                <span><label htmlFor='PeopleReq'> People Required</label><input className='border-1 text-center m-4 rounded-sm text-black' type="number" name="required" plceholder="Number of people required" /></span>

                <span className='flex gap-6 m-4 '>   <label htmlFor="time"> Expires till :</label>

                  <input id='time' name="time" className='border-1 text-center rounded-sm' type="time" />
                  <label htmlFor="date"></label>
                  <input id="date" className='border-1 text-center rounded-sm' type="date" name="date" /></span>


                <input className='border-1 text-center m-4 rounded-sm w-1/3 mx-auto bg-green-800 text-white hover:bg-green-700 cursor-pointer' type="submit" />
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
