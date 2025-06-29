import React from 'react'
import Link from 'next/link'
const FNavbar = () => {
  return (
    <div className='bg-gradient-to-r from-purple-950 to-black text-white  p-4 border-b-1 border-t-2'>
      <ul className='flex items-center justify-between '>
        <li className='flex items-center justify-center'><img className='w-[3vw]' src="/wired-outline-955-demand-hover-roll.gif"/></li>
        <li className='text-4xl font-semibold'>NITTeamly- Create Or Join a Team</li>
        

      </ul>
    </div>
  )
}

export default FNavbar
