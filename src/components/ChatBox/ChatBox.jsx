import React, { useContext, useEffect, useState } from 'react'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';

const ChatBox = () => {
  const { userData, chatUser, messagesId, messages, setMessages, chatVisible, setChatVisible } = useContext(AppContext);
  const [input, setInput] = useState("");

  // sending and saving user data in the firestore database

  const sendMessage = async () => {

    try {

      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date()
          })
        })


        const userIDs = [userData.id, chatUser.rId];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, 'chats', id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex((index) => index.messageId === messagesId);

            userChatData.chatData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatData[chatIndex].updatedAt = Date.now();

            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });

          }

        })

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    // it clears the input field after sending the message
    setInput("");
  }

  const sendImage = async (e) => {

    try {

      const fileUrl =await upload(e.target.files[0]);
      console.log("This is the file url", fileUrl);

      if (fileUrl && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date()
          })
        })
      }


      const userIDs = [userData.id, chatUser.rId];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, 'chats', id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatData = userChatsSnapshot.data();
          const chatIndex = userChatData.chatData.findIndex((index) => index.messageId === messagesId);

          userChatData.chatData[chatIndex].lastMessage = "Image";
          userChatData.chatData[chatIndex].updatedAt = Date.now();

          if (userChatData.chatData[chatIndex].rId === userData.id) {
            userChatData.chatData[chatIndex].messageSeen = false;
          }

          await updateDoc(userChatsRef, {
            chatData: userChatData.chatData,
          });

        }

      })

    } catch (error) {
      toast.error(error.message);
      console.log(error);

    }
  }


  // Convert the timestamp of firebase to 12 hour time format.
  // imp- toDate() method here is not an in-built method of javascript but a firebase timestamp specific method for converting time.

  const convertTimestamp = (timestamp) => {

    // console.log(timestamp);

    const date = timestamp.toDate();

    // console.log(date);
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour > 12) {
      // console.log(hour-12 + ":" + minute + "PM");
      return hour - 12 + ":" + minute + "PM";
    }
    else {
      // console.log(hour + ":" + minute + "AM");
      return hour + ":" + minute + "AM";
    }

  }


  useEffect(() => {


    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse())

        // console.log(res.data().messages.reverse());
      });

      return () => {
        unSub();
      }

    }
  }, [messagesId]);




  return chatUser ? (
    // chat-box
    <div className= {`h-[75vh] relative bg-[#f1f5ff] max-[900px]:w-[100%] max-[900px]:justify-center ${chatVisible ? ""  : "max-[900px]:hidden" } `} >

      {/*top-section chat-user */}
      <div className='py-[10px] px-[15px] flex items-center gap-[10px] border-b border-b-[#c6c6c6] ' >

        <img src={chatUser.userData.avatar} alt="user-img" className='w-[38px] aspect-square rounded-[50%]' />

        <p className="flex-1 font-medium text-[20px] text-[#393939] flex items-center gap-[5px] " >{chatUser.userData.name} { Date.now()- chatUser.userData.lastSeen <= 70000 ?  <img src={assets.green_dot} alt="green-dot" className='!w-[15px]'/> : null } </p> 

        <img src={assets.help_icon} alt="help-icon" className='w-[25px] rounded-[50%] max-[900px]:hidden  ' /> 
        <img onClick={ ()=> setChatVisible(false) } src={assets.arrow_icon} alt="arrow-icon" className='block md:hidden ' />

      </div>

      {/* Middle-section chat-message */}


      <div className=' h-[calc(100%-70px)] pb-[50px] flex flex-col-reverse  overflow-y-scroll'>

        {messages.map((msg, index) => (
          // each-messaage 

          <div key={index} className={msg.sId === userData.id ? 'flex items-end justify-end gap-[5px] py-0 px-[15px]' : 'flex flex-row-reverse items-end justify-end  gap-[5px] py-0 px-[15px]'} >

            {msg.image ? 
            <img src={msg.image} alt="img" className='max-w-[230px] mb-[30px] rounded-[10px] ' />
            : <p className='text-white bg-[#077EFF] p-2 max-w-[200px] text-[11px] font-light rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[8px] mb-2 '> {msg.text} </p> }

            <div className='text-center text-[9px] ' >
              <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} alt="user-img" className='w-[27px] aspect-square rounded-[50px]  ' />
              <p>{convertTimestamp(msg.createdAt)}</p>
            </div>
          </div>
        ))}



        {/* senders-messaage */}

        {/* <div className='flex items-end justify-end gap-[5px] py-0 px-[15px]' >

          <p className='text-white bg-[#077EFF] p-2 max-w-[200px] text-[11px] font-light rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[8px] mb-2 '> sender Lorem ipsum dolor sit amet..</p>

          <div className='text-center text-[9px] ' >
            <img src={assets.profile_img} alt="user-img" className='w-[27px] aspect-square rounded-[50px]  ' />
            <p>2:30 PM</p>
          </div>
        </div> */}



        {/* senders image */}

        {/* <div className='flex items-end justify-end gap-[5px] py-0 px-[15px]' > */}

        {/* <p className='text-white bg-[#077EFF] p-2 max-w-[200px] text-[11px] font-light rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[8px] mb-2 '> sender Lorem ipsum dolor sit amet..</p> */}

        {/* <img src={assets.pic1} alt="img" className='max-w-[230px] mb-[30px] rounded-[10px] ' />

          <div className='text-center text-[9px] ' >
            <img src={assets.profile_img} alt="user-img" className='w-[27px] aspect-square rounded-[50px]  ' />
            <p>2:30 PM</p>
          </div>
        </div> */}




        {/* Receivers-message */}

        {/* <div className='flex flex-row-reverse items-end justify-end  gap-[5px] py-0 px-[15px]'>

          <p className='text-white bg-[#077EFF] p-2 max-w-[200px] text-[11px] font-light rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[0px] mb-2 '> Lorem ipsum dolor sit amet..</p>

          <div className='text-center text-[9px] '>
            <img src={assets.profile_img} alt="user-img" className='w-[27px] aspect-square rounded-[50px]  ' />
            <p>2:30 PM</p>
          </div>
        </div> */}

      </div>

      {/* bottom-section chat-input */}

      <div className='flex items-center gap-3 py-[10px] px-[15px] bg-white absolute bottom-0 right-0 left-0' >

        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Send a message...' className='flex-1 border-none outline-none ' />
        <input onChange={sendImage} type="file" id='image' accept='image/png, image/jpeg ' hidden />

        <label htmlFor="image" className='flex ' >
          <img className='w-[22px] cursor-pointer ' src={assets.gallery_icon} alt="gallery-icon" />
        </label>
        <img onClick={sendMessage} className='w-[30px] cursor-pointer' src={assets.send_button} alt="send-icon" />

      </div>

    </div >
  )
    : <div className={` w-full flex flex-col items-center justify-center gap-[5px] ${chatVisible ? ""  : " max-[900px]:hidden" } `} >
      <img src={assets.logo_icon} width={60} alt="logo" />
      <p className='font-medium text-xl text-[#383838] ' >Chat anytime, anywhere</p>
    </div>
}

export default ChatBox
