import React, { useContext, useEffect, useState } from 'react'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'

const RightSidebar = () => {

  const { chatUser, messages } = useContext(AppContext);
  const [msgImages, setMsgImages] = useState([]);


  useEffect(() => {
    let tempVar = [];

    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image)
      }
    });
    setMsgImages(tempVar);
  }, [messages]);


  return chatUser ? (
    // right-sidebar
    <div className='text-white bg-[#001030] relative h-[75vh] overflow-y-scroll '>

      {/* rs user profile */}
      <div className='pt-[60px] flex flex-col items-center space-x-4 '>

        <img src={chatUser.userData.avatar} alt="user-profile" className='w-[110px] aspect-square rounded-[50%] ' />

        <h3 className='flex items-center justify-center gap-[5px] text-[18px] font-normal my-[5px] mx-0' >{chatUser.userData.name} { Date.now()- chatUser.userData.lastSeen <= 70000 ?  <img src={assets.green_dot} alt="green-dot" className='!w-[15px]'/> : null } 
        </h3>
        <p className='text-[10px] opacity-[80%] font-light ' >{chatUser.userData.bio}</p>

      </div>
      <hr className=' border-[#ffffff50] my-[15px] mx-0 ' />

      {/* right side media section */}
      <div className='py-0 px-5 text-[13px]  ' >

        <p>Media</p>
        <div className='max-h-[180px] overflow-y-scroll grid grid-cols-3 gap-[5px] mt-2 [&>img]:w-[60px] [&>img]:rounded-lg [&>img]:cursor-pointer ' >

          {
            msgImages.map((url, index) => (

              <img onClick={() => window.open(url)} key={index} src={url} alt="image" />

            ))
          }


          {/* <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" /> */}


        </div>
      </div>
      <button onClick={() => logout()} className='absolute bottom-5 left-[50%] -translate-x-1/2 bg-[#077eff] text-white border-none text-[12px] font-light
      py-[10px] px-[65px] rounded-[20px] cursor-pointer ' >Logout</button>

    </div>
  )
    : (
      <div className='text-white bg-[#001030] relative h-[75vh] overflow-y-scroll ' >
        <button onClick={() => logout()} className='absolute bottom-5 left-[50%] -translate-x-1/2 bg-[#077eff] text-white border-none text-[12px] font-light
      py-[10px] px-[65px] rounded-[20px] cursor-pointer ' >Logout</button>
      </div>
    )
}

export default RightSidebar
