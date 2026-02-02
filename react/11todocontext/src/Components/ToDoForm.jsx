import React, { useState } from 'react'
import { useToDoContext } from '../Context'



function ToDoForm() {
    const [todo,setTodo] = useState("")
    const {addToDo} = useToDoContext();
    
    const add=(e)=>{
        e.preventDefault()

        if(!todo.trim()) return;

        addToDo({todo,completed:false})
        setTodo("")
    }

  return (
    <form onSubmit={add} className='flex'>
        <input
        type="text"
        placeholder='write your todo'
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        />
        <button
        type='submit'
        className='bg-blue-600 px-4 py-1.5 rounded-r-lg hover:bg-blue-700 duration-150'>
            Add
        </button>

        </form>
  )
}

export default ToDoForm
