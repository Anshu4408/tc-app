import React from 'react'
import FNavbar from '../components/finalNav/Nav'

const page = () => {
  return (
    <div>
      <FNavbar />
      <div className='flex items-center justify-center h-[90vh]'>
        <div className='text-4xl font-semibold text-center'>
          <h1 className='text-blue-600'>Privacy Policy</h1>
          <p className='text-gray-700 mt-4'>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our platform.</p>
        </div>
      </div>
    </div>
  )
}

export default page

