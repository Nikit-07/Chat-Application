import React from 'react'
import assets from '../../assets/assets'

const ChatBox = () => {
  return (
    // chat-box
    <div className='h-[75vh] relative bg-[#f1f5ff]' >

      {/*top-section chat-user */}
      <div className='py-[10px] px-[15px] flex items-center gap-[10px] border-b border-b-[#c6c6c6] ' >

        <img src={assets.profile_img} alt="user-img" className='w-[38px] aspect-square rounded-[50%]' />

        <p className="flex-1 font-medium text-[20px] text-[#393939] flex items-center gap-[5px] " >David  <img src={assets.green_dot} alt="green-dot" className='!w-[15px]' /></p>

        <img src={assets.help_icon} alt="help-icon" className='w-[25px] rounded-[50%]' />

      </div>

      {/* Middle-section chat-message */}

      <div className=' h-[calc(100%-70px)] pb-[50px] flex flex-col-reverse  overflow-y-scroll'>

        {/* senders-messaage */}
        <div className='flex items-end justify-end gap-[5px] py-0 px-[15px]' >

          <p className='text-white bg-[#077EFF] p-2 max-w-[200px] text-[11px] font-light rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[8px] mb-2 '> sender Lorem ipsum dolor sit amet..</p>

          <div className='text-center text-[9px] ' > 
            <img src={assets.profile_img} alt="user-img" className='w-[27px] aspect-square rounded-[50px]  ' />
            <p>2:30 PM</p>
          </div>
        </div>

        {/* senders image */}
        <div className='flex items-end justify-end gap-[5px] py-0 px-[15px]' >

          {/* <p className='text-white bg-[#077EFF] p-2 max-w-[200px] text-[11px] font-light rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[8px] mb-2 '> sender Lorem ipsum dolor sit amet..</p> */}
          
          <img src={assets.pic1} alt="img" className='max-w-[230px] mb-[30px] rounded-[10px] ' />

          <div className='text-center text-[9px] ' > 
            <img src={assets.profile_img} alt="user-img" className='w-[27px] aspect-square rounded-[50px]  ' />
            <p>2:30 PM</p>
          </div>
        </div>



        
        {/* Receivers-message */}
        <div className='flex flex-row-reverse items-end justify-end  gap-[5px] py-0 px-[15px]'>

          <p className='text-white bg-[#077EFF] p-2 max-w-[200px] text-[11px] font-light rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[0px] mb-2 '> Lorem ipsum dolor sit amet..</p>

          <div className='text-center text-[9px] '>
            <img src={assets.profile_img} alt="user-img" className='w-[27px] aspect-square rounded-[50px]  ' />
            <p>2:30 PM</p>
          </div>
        </div>
       
      </div>

      {/* bottom-section chat-input */}

      <div className='flex items-center gap-3 py-[10px] px-[15px] bg-white absolute bottom-0 right-0 left-0' >

        <input type="text" placeholder='Send a message...' className='flex-1 border-none outline-none ' />
        <input type="file" id='image' accept='image/png, image/jpeg ' hidden />

        <label htmlFor="image" className='flex ' >
          <img className='w-[22px] cursor-pointer ' src={assets.gallery_icon} alt="gallery-icon"/ >
        </label>
        <img className='w-[30px] cursor-pointer' src={assets.send_button} alt="send-icon" />

      </div>

    </div>
  )
}

export default ChatBox
