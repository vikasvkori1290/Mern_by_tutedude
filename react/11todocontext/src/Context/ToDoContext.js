import { createContext,useContext } from "react";

export const ToDoContext = createContext({
    todos:[
        {
            id :1,
            todo:"will complete react by eod",
            completed:false
        }
    ],
    addToDo: (todo)=>{},
    updateToDo: (id,todo)=>{},
    deleteToDo: (id)=>{},
    toggleComplete: (id)=>{}
});

export const useToDoContext = () => {
    return useContext(ToDoContext);
}

export const ToDoContextProvider = ToDoContext.Provider;
