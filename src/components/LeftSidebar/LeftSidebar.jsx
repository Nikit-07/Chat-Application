import React from 'react'
import assets from '../../assets/assets'

const LeftSidebar = () => {
    return (
        // left sidebar
        <div className='bg-[#001030] text-white h-[70vh] ' >

            {/* left sidebar top */}
            <div className='p-[20px]'>

                {/* navigation */}
                <div className='flex items-center justify-between' >
                    <img src={assets.logo} alt="chat-logo" className='max-w-[140px]' />
                    {/* icon */}
                    <div>
                        <img src={assets.menu_icon} alt="menu-icon" className=" max-h-[20px] cursor-pointer opacity-60 " />
                    </div>
                </div>

                {/* search bar */}
                <div className='bg-[#002670] flex items-center gap-[10px] py-[10px] px-3 mt-5 ' >
                    <img src={assets.search_icon} alt="search-icon" className='w-4 ' />
                    <input type="text" placeholder='Search here...'
                        className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] ' />
                </div>
            </div>

            {/* users list */}
            <div className='flex flex-col h-[70%] overflow-y-scroll '>

                {/* Multiple users */}

                {
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

            </div>
        </div>

    )
}

export default LeftSidebar
