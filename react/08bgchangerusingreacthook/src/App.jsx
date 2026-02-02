import { useState } from "react"

function App() {
  
  let [Color, setColor] = useState("black")
  return (
    <>
      <div className="w-full h-screen duration-200" style={{backgroundColor: Color}}>
        <div className="fixed flex flex-wrap justify-center gap-3 shadow-md bottom-12 inset-x-0 x-2 py-2 rounded-2xl bg-white/60">
          <button onClick={() => setColor("green")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg " style={{backgroundColor: "green"}}>Green</button>
          <button onClick={() => setColor("blue")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg " style={{backgroundColor: "blue"}}>Blue</button>
          <button onClick={() => setColor("red")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg " style={{backgroundColor: "red"}}>Red</button>
          <button onClick={() => setColor("purple")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg " style={{backgroundColor: "purple"}}>Purple</button>
          <button onClick={() => setColor("pink")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg " style={{backgroundColor: "pink"}}>Pink</button>
          <button onClick={() => setColor("black")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg " style={{backgroundColor: "black"}}>default</button>
        </div>
      </div>
    </>
  )
}

export default App
