import React from 'react'
import './Homepage.css'
import Navbar from './Navbar/Navbar'
import ImageUpload from './ImageUpload/imageUpload'
import TypewriterText from './TypeText/TypewriterText'

const Homepage = () => {
  return (
    <div className='homepage'>
        <Navbar />
        <ImageUpload />
        <br />
        <TypewriterText />
        <br />
    </div>
  )
}

export default Homepage