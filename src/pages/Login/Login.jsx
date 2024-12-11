import React, { useState } from 'react'
import assets from '../../assets/assets'


const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-no-repeat bg-cover
                    flex items-center justify-evenly"  >
      <img src={assets.logo_big} alt="logo" className="w-[max(20vw,200px)]" />

      <form className="bg-white flex flex-col gap-5 py-[20px] px-[30px] rounded-[10px]" >

        <h2 className=' font-medium text-2xl' >{currentState}</h2>

        {currentState === "Sign Up" ? <input type="text" placeholder='username' required className='input-style' /> : null}

        <input type="email" placeholder='Email address' required className='input-style' />
        <input type="password" placeholder='password' required className='input-style' />

        <button type="submit" className='p-[10px] bg-[#077EFF] text-white text-[16px] border-none rounded-[4px] cursor-pointer' > {currentState === "Sign Up" ? "Create Account" : "Login now"} </button>

        <div className='flex gap-[5px] text-xs text-[#808080] ' >
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-[5px]'>

          {
            currentState === "Sign Up"
              ? <p className='text-[13px] text-[#5c5c5c] ' >Already have an account? <span className=' cursor-pointer text-[#077eff] font-medium ' onClick={() => setCurrentState("Login")} > Login here </span> </p>
              : <p className='text-[13px] text-[#5c5c5c] ' >Create an account <span className=' cursor-pointer text-[#077eff] font-medium ' onClick={() => setCurrentState("Sign Up")} > Click here </span> </p>
          }



        </div>
      </form>
    </div>
  )
}


export default Login
