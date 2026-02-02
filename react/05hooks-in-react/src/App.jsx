import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [counter , setCounter] = useState(10);
  function addValue(){
  setCounter(counter+1)
  }
  function subValue(){
    setCounter(counter-1)
  }


  return (
    <>
      <h1>hey everyone! we are here to understand hook in react js</h1>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>
      <h3>Counter : {counter}</h3>

      <button onClick={addValue}>increament by 1</button>
      <button onClick={subValue}>decreament by 1</button>
    </>
  )
}

export default App
