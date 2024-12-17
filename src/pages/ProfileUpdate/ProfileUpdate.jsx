import React, { useState } from 'react'
import assets from '../../assets/assets'

const ProfileUpdate = () => {
  const[image, setImage]=useState(null);
  return (
    // profile
    <div className=' min-h-[100vh] bg-[url("/background.png")] bg-cover bg-no-repeat flex items-center justify-center' >

      {/* profile-container */}
      <div className='bg-white flex items-center justify-between min-w-[700px] rounded-[10px] '>

        <form className='flex flex-col gap-5 p-10 ' >

          <h3 className='font-medium' > Profile Details</h3>

          <label htmlFor="avvatar" className=' flex items-center gap-[10px] text-gray-500 cursor-pointer'  >

            <input type="file" id='avvatar' accept='.png, .jpg, .jpeg' hidden onChange={(e)=>setImage(e.target.files[0]) }/>

            <img src={ image ? URL.createObjectURL(image) : assets.avatar_icon} alt="icon" className=' w-[50px] rounded-[50%] aspect-square ' />
            upload profile image
          </label>

          <input type="text" placeholder='Your name' required className=' p-[10px] min-w-[300px] border border-[#c9c9c9] outline-[#077eff] ' />
          <textarea placeholder='Write profile bio...' required className=' p-[10px] min-w-[300px] border border-[#c9c9c9] outline-[#077eff]'></textarea>
          <button type='submit' className='border-none text-white bg-[#077eff] p-2 text-[16px] cursor-pointer ' >Save</button>

        </form>
        <img src={image ? URL.createObjectURL(image) : assets.logo_icon} alt="" className=' max-w-[160px] aspect-square my-5 mx-auto rounded-[50%] ' />
      </div>
      
    </div>
  )
}

export default ProfileUpdate
