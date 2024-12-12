import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Chat = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(#596AFF,#383699)] grid place-items-center">
      <div className='w-[95%] h-[70vh] max-w-[1000px] grid grid-cols-[1fr_2fr_1fr] bg-[aliceblue]  '>
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>

      </div>
      
    </div>
  )
}

export default Chat
