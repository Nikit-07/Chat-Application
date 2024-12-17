import React from 'react'
import assets from '../../assets/assets'

const RightSidebar = () => {
  return (
    // right-sidebar
    <div className='text-white bg-[#001030] relative h-[75vh] overflow-y-scroll '>

      {/* rs user profile */}
      <div className='pt-[60px] flex flex-col items-center space-x-4 '>
        
        <img src={assets.profile_img} alt="user-profile" className='w-[110px] aspect-square rounded-[50%] ' />

        <h3 className='flex items-center justify-center gap-[5px] text-[18px] font-normal my-[5px] mx-0' >David <img src={assets.green_dot}  alt="green-dot" /></h3>
        <p className='text-[10px] opacity-[80%] font-light ' >Hey, There I am David using Chat App.</p>

      </div>
      <hr className=' border-[#ffffff50] my-[15px] mx-0 ' />

      {/* right side media section */}
      <div className='py-0 px-5 text-[13px]  ' >

      <p>Media</p>
      <div className='max-h-[180px] overflow-y-scroll grid grid-cols-3 gap-[5px] mt-2 [&>img]:w-[60px] [&>img]:rounded-lg [&>img]:cursor-pointer ' >
        <img src={assets.pic1} alt="" />
        <img src={assets.pic2} alt="" />
        <img src={assets.pic3} alt="" />
        <img src={assets.pic4} alt="" />
        <img src={assets.pic1} alt="" />
        <img src={assets.pic2} alt="" />
      </div>
      </div>
      <button className='absolute bottom-5 left-[50%] -translate-x-1/2 bg-[#077eff] text-white border-none text-[12px] font-light
      py-[10px] px-[65px] rounded-[20px] cursor-pointer ' >Logout</button>

    </div>
  )
}

export default RightSidebar
