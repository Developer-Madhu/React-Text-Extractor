import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './Components/Homepage'

function App() {

  const route = createBrowserRouter([
    {
      path:'/home',
      element:<Homepage />
    }
  ])

  return (
    <div className='app'>
     <RouterProvider router={route} />
    </div>
  )
}

export default App
