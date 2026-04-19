import { v4 as uuidv4 } from "uuid";

export default function taskReducer(state, action) {
  switch (action.type) {
    case "add": {
      const newTask = {
        id: uuidv4(),
        name: action.payload.name,
        description: action.payload.description,
        isCompleted: false,
      };
      const updatedTodos = [newTask, ...state];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "delete": {
      const DeleteTask = state.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(DeleteTask));
      return DeleteTask;
    }
    case "edit": {
      const targetEdit = state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              name: action.payload.editedTitle,
              description: action.payload.editedDescription,
            }
          : task,
      );
      localStorage.setItem("todos", JSON.stringify(targetEdit));
      return targetEdit;
    }
    case "complete": {
      const filterToDos = state.map((task) =>
        task.id === action.payload.id ? { ...task, isCompleted: !task.isCompleted } : task,
      );
      localStorage.setItem("todos", JSON.stringify(filterToDos));
      return filterToDos;
    }
  }
}
