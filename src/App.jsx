import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { UserProvider } from './context/userContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <>
        <UserProvider>
          <RouterProvider router={router} />
          <ToastContainer style={{ position: "top-right", hideProgressBar: true }}/>
        </UserProvider>
      </>
    </div>
  )
}

export default App
