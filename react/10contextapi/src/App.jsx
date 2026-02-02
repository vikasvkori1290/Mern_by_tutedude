import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserContextProvider from './Context/UserContextProvider'
import Login from './Components/Login'
import Profile from './Components/profile'

function App() {

  return (
    <UserContextProvider>
    {/* <h4 className='text-3xl'>react context api course</h4> */}
      <Login/>
      <Profile/>
      
    </UserContextProvider>
  )
}

export default App
