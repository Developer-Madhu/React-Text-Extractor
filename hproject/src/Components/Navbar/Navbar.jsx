import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">
            <h2>TextExt.</h2>
        </div>
        <div className="links">
           <p>Docs</p>
           <p>About</p>
           <p>Support</p>
        </div>
        <div className="btns">
            <button>Login</button>
            <button>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar