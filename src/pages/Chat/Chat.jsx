import React, { useContext, useEffect, useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import { AppContext } from '../../context/AppContext'

const Chat = () => {
  const { chatData, userData } = useContext(AppContext); 
  const [loading, setLoading] = useState(true);

  useEffect( ()=>{

    if(chatData && userData){ // if chat data and user data is present
      setLoading(false);   // Data is loaded, stop showing the loading screen
    } 

  }, [userData, chatData]);


  return (
    <div className="min-h-screen bg-[linear-gradient(#596AFF,#383699)] grid place-items-center">

      {
        loading ? <p className='text-5xl text-white max-[900px]:text-[30px]' >Loading...</p> 
        :
          <div className='w-[95%] h-[75vh] max-w-[1000px] grid grid-cols-[1fr_2fr_1fr] bg-[aliceblue] max-[900px]:flex '>
            <LeftSidebar />
            <ChatBox />
            <RightSidebar />
          </div>
      }


    </div>
  )
}

export default Chat
