import React, { useContext, useState } from 'react'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';

const LeftSidebar = () => {

    const navigate = useNavigate();
    const { userData } = useContext(AppContext);
    // console.log("Thsi is user logged in data", userData);

    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);

    const inputHandler = async (e) => {
        try {
            const input = e.target.value;

            if (input) {
                setShowSearch(true);
                const userRef = collection(db, 'users');
                const q = query(userRef, where("username", "==", input.toLowerCase()));
                const querySnap = await getDocs(q);

                if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
                    // console.log("First Doc Data:", querySnap.docs[0].data()); // Actual data of the first doc
                    setUser(querySnap.docs[0].data());
                }
                else {
                    setUser(null);
                }

            }
            else{
                setShowSearch(false);
            }

        } catch (error) {
            console.error("Error in inputHandler:", error);
        }
    }

    console.log("All users data", user);


    return (
        // left sidebar
        <div className='bg-[#001030] text-white h-[75vh] ' >

            {/* left sidebar top */}
            <div className='p-[20px]'>

                {/* navigation */}
                <div className='flex items-center justify-between' >
                    <img src={assets.logo} alt="chat-logo" className='max-w-[140px]' />

                    {/* Menu-icon */}
                    <div className=' relative py-[10px] px-0 group ' >
                        <img src={assets.menu_icon} alt="menu-icon" className=" max-h-[20px] cursor-pointer opacity-60 " />

                        {/* Sub-Menu */}
                        <div className=' absolute top-[100%] right-0 w-[130px] p-[20px] rounded-[5px] bg-white text-black
                        [&>p]:cursor-pointer [&>p]:text-[14px] hidden group-hover:block ' >

                            <p onClick={() => navigate('/profile')} >Edit Profile</p>
                            <hr className=' border-none h-px bg-[#a4a4a4] my-2 mx-0 ' />
                            <p  >Logout</p>
                        </div>
                    </div>
                </div>

                {/* search bar */}
                <div className='bg-[#002670] flex items-center gap-[10px] py-[10px] px-3 mt-5 ' >
                    <img src={assets.search_icon} alt="search-icon" className='w-4 ' />
                    <input onChange={inputHandler} type="text" placeholder='Search here...'
                        className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] ' />
                </div>
            </div>

            {/* users list */}
            <div className='flex flex-col h-[70%] overflow-y-scroll '>

                {/* Multiple users */}

                { showSearch && user ? 
                    
                        <div className='flex items-center gap-[10px] py-[10px] px-[20px] cursor-pointer text-[13px] hover:bg-[#077EFF] group'>

                            <img src={user.avatar} alt="profile-img" className='w-[35px] rounded-[50%] aspect-square ' />
                            <p> {user.name} </p>
                              
                        </div>
                        : 
                        Array(10).fill("").map((arr, index) => (
                            <div className='flex items-center gap-[10px] py-[10px] px-[20px] cursor-pointer text-[13px] hover:bg-[#077EFF] group' key={index}>
    
                                <img src={assets.profile_img} alt="profile-img" className='w-[35px] rounded-[50%] aspect-square ' />
    
                                <div className='flex flex-col'>
                                    <p>David</p>
                                    <span className='text-[#9f9f9f] text-[11px] group-hover:text-white '>Hello, How are you.</span>
                                </div>
                            </div>
                        ))
                    
                }





                {/* {
                    Array(10).fill("").map((arr, index) => (
                        <div className='flex items-center gap-[10px] py-[10px] px-[20px] cursor-pointer text-[13px] hover:bg-[#077EFF] group' key={index}>

                            <img src={assets.profile_img} alt="profile-img" className='w-[35px] rounded-[50%] aspect-square ' />

                            <div className='flex flex-col'>
                                <p>David</p>
                                <span className='text-[#9f9f9f] text-[11px] group-hover:text-white '>Hello, How are you.</span>
                            </div>
                        </div>
                    ))
                } */}

            </div>
        </div>

    )
}

export default LeftSidebar
