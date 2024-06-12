import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-black flex justify-around h-15 text-white'>
        <div className="flex ">
        <span className="font-bold text-green-200 text-lg">&lt;</span>
        <span className="font-bold text-lg">Pass</span>
        <span className="font-bold text-green-200 text-lg">/OP&gt;</span>
      </div>
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold text-sm' >Home</a>
            <a className='hover:font-bold text-sm'>Contact Us</a>
            <a className='hover:font-bold text-sm'>About</a>
            <a className='hover:font-bold text-sm'>Help and Support</a>
        </li>
      </ul>
    </nav>
  )
}

export default navbar
