import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

function App() {

  return (
    <div>
      <>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </>
    </div>
  )
}

export default App
