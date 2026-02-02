import React from 'react'
import { useToDoContext } from '../Context'

function ToDoItem({ todo }) {
  const { updateToDo, deleteToDo, toggleComplete } = useToDoContext()

  return (
    <div className={`flex items-center gap-3 px-3 py-2 text-lg rounded-lg transition-all ${todo.completed ? 'bg-green-600' : 'bg-[#cccccc]/20'}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="w-4 h-4 cursor-pointer"
      />
      <input
        type="text"
        value={todo.todo}
        onChange={(e) => updateToDo(todo.id, { todo: e.target.value })}
        className={`flex-1 px-2 py-1 rounded outline-none ${todo.completed ? 'line-through' : ''} bg-transparent`}
      />
      <button
        onClick={() => deleteToDo(todo.id)}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  )
}

export default ToDoItem
