import React from 'react'
import './Homepage.css'
import Navbar from './Navbar/Navbar'
import ImageUpload from './ImageUpload/ImageUpload'
import Image from './BgImg/Image'

const Homepage = () => {
  return (
    <div className='homepage'>
        <Navbar />
        <Image />
        <ImageUpload />
        <br />
    </div>
  )
}

export default Homepage