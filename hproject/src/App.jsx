import { useState } from 'react'
import './App.css'
import Homepage from './Components/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
     <Homepage />
    </div>
  )
}

export default App
