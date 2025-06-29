import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='bg-gradient-to-r from-purple-950 to-black text-white  p-4 border-b-1 border-t-2'>
      <ul className='flex items-center justify-between '>
        <li className='flex items-center justify-center'><img className='w-[3vw]' src="/wired-outline-955-demand-hover-roll.gif"/></li>
        <li className='text-4xl font-semibold'>NITTeamly</li>
        <li className=' bg-white rounded-sm pl-4 pr-4 p-1 text-black font-semibold ' ><Link href="https://auth.delta.nitt.edu/authorize?client_id=7DuYVAtE2yceX~6S&redirect_uri=https://tc-app-ssgz.onrender.com/api/auth/callback&response_type=code&grant_type=authorization_code&state=123&scope=openid+email+profile+user&nonce=abc">Log In</Link></li>

      </ul>
    </div>
  )
}

export default Navbar
