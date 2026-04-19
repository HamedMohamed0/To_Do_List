
import Task from "./Task";
import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";
export default function ToDoList() {
  const { todos } = useContext(TasksContext);
  const taskList = todos.map((task) => (
    <Task key={task.id} taskDetails={task} />
  ));
  
  return (
    <>
      {taskList}
    </>
  );
}
