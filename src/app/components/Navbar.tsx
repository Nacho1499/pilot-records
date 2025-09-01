import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='bg-gradient-to-r from-slate-900 to-slate-700 py-5 px-10'>
        <Image src="/uas.png" width={200} height={100} alt='logo'/>
        
    </div>
  )
}

export default Navbar