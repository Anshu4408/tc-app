import React from 'react'
import FNavbar from '../components/finalNav/Nav'

const page = () => {
  return (
    <div>
      <FNavbar />
      <div className='flex items-center justify-center h-[90vh]'>
        <div className='text-4xl font-semibold text-center'>
          <h1 className='text-blue-600'>Contact Us</h1>
          <p className='text-gray-700 mt-4'>If you have any questions or feedback, feel free to reach out to us at <a href="mailto:support@nitteamly.com" className='text-blue-500'>support@nitteamly.com</a>.</p>
        </div>
      </div>
    </div>
  )
}


export default page
