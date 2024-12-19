import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const router= createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
    },

    {
      path: '/chat',
      element: <Chat/>,
    },

    {
      path: '/profile',
      element: <ProfileUpdate/>
    }


  ]);
  return (
   <>
   <ToastContainer/>
   <RouterProvider router={router} />

   </>
  )
}

export default App
