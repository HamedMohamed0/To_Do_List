import Task from "./Task";
import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";
export default function CompletedTodos() {
  const { todos } = useContext(TasksContext);
  const taskList = todos.map((task) => {
    if(task.isCompleted === true){
      return <Task key={task.id} taskDetails={task} />
    }
  } 
  );

  return <>{taskList}</>;
}