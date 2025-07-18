import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='bg-gradient-to-r from-blue-800 to-black text-white  p-4  '>
      <ul className='flex items-center justify-between '>
        <li className='flex items-center justify-center'><img className='w-[3vw]' src="/wired-outline-955-demand-hover-roll.gif"/></li>
        <li className=' text-lg md:text-2xl lg:text-4xl font-semibold'>NITTeamly</li>
        <li className='  rounded-2xl pl-4 pr-4 p-1 border-1 text-blue-300 font-semibold bg-black hover:bg-gray-900 cursor-pointer ' ><Link href="https://auth.delta.nitt.edu/authorize?client_id=7DuYVAtE2yceX~6S&redirect_uri=https://tc-app-nu.vercel.app/api/auth/callback&response_type=code&grant_type=authorization_code&state=123&scope=openid+email+profile+user&nonce=abc">Login with<img src='/delta.png' className='inline w-11 h-11 ml-1' alt='DAuth Logo'/></Link></li>

      </ul>
    </div>
  )
}

export default Navbar
