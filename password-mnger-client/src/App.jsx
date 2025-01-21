import { useState } from 'react'
import Navbar from './components/Navbar.jsx';
import Welcome from './components/Welcome.jsx';
import Passwords from './components/Password.jsx';

const App = () => {

  return (
      <div className="h-full w-full bg-gray-100">
        <Navbar/>
        <Welcome/>
        <Passwords/>
      </div>
  )
}

export default App
