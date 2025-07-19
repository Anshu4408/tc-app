import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-black text-white py-6 mt-10 relative z-10  top-[-40vh] md:top-[-15vh] lg:top-[10vh]">
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    
    <div className="text-center md:text-left mb-4 md:mb-0">
      <h1 className="text-2xl font-bold text-blue-400">NITTeamly</h1>
      <p className="text-sm text-gray-400">Connecting Trichians, one group at a time.</p>
    </div>

    <ul className="flex space-x-6 text-sm text-gray-300">
      <li><a href="/about" className="hover:text-white transition">About</a></li>
      <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
      <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
    </ul>
  </div>

  <div className=" text-center text-gray-500 ">
    Made with ❤️ by Team TC · © {new Date().getFullYear()} NIT Trichy
  </div>
</footer>
  )
}

export default Footer
