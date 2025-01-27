import React from 'react'
import './Homepage.css'
import Navbar from './Navbar/Navbar'
import ImageUpload from './ImageUpload/ImageUpload'

const Homepage = () => {
  return (
    <div className='homepage'>
        <Navbar />
        <ImageUpload />
        <br />
    </div>
  )
}

export default Homepage