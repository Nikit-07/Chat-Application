import React, { useContext, useEffect, useState } from 'react'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate=useNavigate();
  const[image, setImage]=useState(null);

  const [name, setname]=useState('');
  const [bio, setBio]= useState('');
  const[uid, setUid]= useState('');
  const[prevImg, setPrevImg]= useState('');

  const {setUserData}= useContext(AppContext);

  const updateProfile= async (event)=>{
    event.preventDefault();

    try {
      if(!image && !prevImg){
        toast.error("Upload profile image");
      }

      const docRef= doc(db, "users", uid);
      if(image){
        const imageURL= await upload(image);
        setPrevImg(imageURL);

        await updateDoc(docRef, {
          avatar: imageURL,
          bio:bio,
          name:name
        });

      } else{
        await updateDoc(docRef, {
          bio:bio,
          name:name
        });

      }

      const snap= await getDoc(docRef);
      setUserData(snap.data());
      navigate('/chat');

      
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }

  }



  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        setUid(user.uid);
        const docRef= doc(db, "users", user.uid);
        const docSnap= await getDoc(docRef);

        if(docSnap.data().name){
          setname(docSnap.data().name);
        }
        if(docSnap.data().bio){
          setBio(docSnap.data().bio);
        }
        if(docSnap.data().avatar){
          setPrevImg(docSnap.data().avatar);
        }
  
      }
      else{
        navigate('/');
      }
    })

  },[])


  return (
    // profile
    <div className=' min-h-[100vh] bg-[url("/background.png")] bg-cover bg-no-repeat flex items-center justify-center' >

      {/* profile-container */}
      <div className='bg-white flex items-center justify-between min-w-[700px] rounded-[10px] '>

        <form onSubmit={updateProfile} className='flex flex-col gap-5 p-10 ' >

          <h3 className='font-medium' > Profile Details</h3>

          <label htmlFor="avvatar" className=' flex items-center gap-[10px] text-gray-500 cursor-pointer'  >

            <input type="file" id='avvatar' accept='.png, .jpg, .jpeg' hidden onChange={(e)=>setImage(e.target.files[0]) }/>

            <img src={ image ? URL.createObjectURL(image) : assets.avatar_icon} alt="icon" className=' w-[50px] rounded-[50%] aspect-square ' />
            upload profile image
          </label>

          <input type="text" onChange={(e)=> setname(e.target.value)}  value={name} placeholder='Your name' required className=' p-[10px] min-w-[300px] border border-[#c9c9c9] outline-[#077eff] ' />
          <textarea  onChange={(e)=> setBio(e.target.value)} value={bio} placeholder='Write profile bio...' required className=' p-[10px] min-w-[300px] border border-[#c9c9c9] outline-[#077eff]'></textarea>
          <button type='submit' className='border-none text-white bg-[#077eff] p-2 text-[16px] cursor-pointer ' >Save</button>

        </form>
        <img src={image ? URL.createObjectURL(image) : prevImg? prevImg :  assets.logo_icon} alt="" className=' max-w-[160px] aspect-square my-5 mx-auto rounded-[50%] ' />
      </div>
      
    </div>
  )
}

export default ProfileUpdate
