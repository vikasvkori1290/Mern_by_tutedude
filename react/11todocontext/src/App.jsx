import { useEffect, useState } from 'react'
import './App.css'
import { ToDoContextProvider } from './Context/ToDoContext'
import { ToDoForm, ToDoItem } from './Components'

function App() {
  const [todos,setTodos] = useState([])

  const addToDo = (todo) => {
    setTodos((prev) => [{id:Date.now(),...todo},...prev ])
  }

  const updateToDo = (id,todo) => {
    setTodos((prev) => prev.map((t) => t.id === id ? {...t,...todo} : t))
  }

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((t) => t.id === id ? {...t,completed:!t.completed} : t))
  }
  
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <ToDoContextProvider value={{todos,addToDo,updateToDo,deleteToDo,toggleComplete}}>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <div className='mb-4'>
          {/* Header Section */}
          <ToDoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <ToDoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div> 
    </ToDoContextProvider>    

  )
}

export default App
