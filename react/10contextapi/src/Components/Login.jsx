import React, {useState,useContext} from 'react'
// import React,{useState,useContext} from 'react'
import UserContext from '../Context/UserContext'

function Login() {

        const {username,setusername}=useState('')
        const {password,setpassword}=useState('')
        const {setUser}=useContext(UserContext)
    const handleSubmit=(e)=>{
        e.preventDefault();
        setUser({username,password});
    }

  return (
    <div>
      <h3 className='text-3xl bg-gren-300'>login page</h3>
      <input type="text" placeholder='UserName' value={username} onChange={(e)=> setUserName (e.target.value)}/>
      <br/>
        <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword (e.target.value)}/>
        <br/>
        <button onClick={handleSubmit} className='bg-blue-500 text-white p-2 rounded-md mt-2'>Login</button>
    </div>
  )
}

export default Login
