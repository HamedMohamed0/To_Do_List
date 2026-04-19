import {useEffect } from "react";
import { TasksContext } from "./TasksContext";
import taskReducer from "../reducers/taskReducer";
import { useReducer } from "react";
import { DispatchContext } from "./DispatchContext";

export default function TasksProvider({ children }) {
  const initializer = () => {
    const StoredTodos = localStorage.getItem("todos");
    return StoredTodos ? JSON.parse(StoredTodos) : [];
  };

  const [todos, dispatch] = useReducer(taskReducer, initializer());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TasksContext.Provider value={{ todos }}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TasksContext.Provider>
  );
}

