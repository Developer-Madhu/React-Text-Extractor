import React from 'react'
import './Image.css'
import bgimg from './bgimg.png'

const Image = () => {
  return (
    <div className='image'>
        <img src={bgimg} alt="" />
    </div>
  )
}

export default Image