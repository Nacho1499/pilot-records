import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className='min-h-screen flex justify-center items-center bg-gradient-to-r from-slate-900 to-slate-700'>
            <div>
                 <Image className='mx-auto mb-10' src="/uas.png" width={100} height={50} alt='logo'/>
                <h1 className='text-white text-5xl font-bold'> <span className='text-[#d4af37]'> BRIECH</span> UAS DRONE PILOT RECORDS</h1>
                <div className='flex justify-center items-center gap-5 mt-10'>
                    <button className='bg-[#d4af37] py-3 px-6 font-semibold rounded-lg text-white cursor-pointer'>Create Record</button>
                    <button className='border border-[#d4af37] font-semibold text-white py-3 px-6 rounded-lg cursor-pointer '>View Recodes</button>
                </div>

            </div>


        </div>
    )
}

export default Hero