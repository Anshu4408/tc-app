import React from 'react'
import FNavbar from '../components/finalNav/Nav'
const page = () => {
  return (
    <div>
      <FNavbar />
      <div className='flex items-center justify-center h-[90vh]'>
        <div className='text-4xl font-semibold text-center'>
          <h1 className='text-blue-600'>About Us</h1>
          <p className='text-gray-700 mt-4'>NITTeamly is a platform designed to help students at NIT Trichy connect and collaborate on various projects and teams. Our goal is to foster teamwork and innovation among students by providing a space where they can easily find and join teams that match their interests and skills.</p>
        </div>
      </div>
    </div>
  )
}

export default page
