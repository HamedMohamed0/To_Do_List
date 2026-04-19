import ToDoList from "./components/ToDoList";
import TasksProvider from "./contexts/TasksProvider";
import { Route, Routes } from "react-router";
import ActiveToDos from "./components/ActiveToDos";
import { Navbar } from "./components/Navbar";
import AddTask from "./components/AddTask";
import CompletedTodos from "./components/CompletedToDos";
import { SnackBarProvider } from "./contexts/SnackBarProvider";

function App() {


  return (
    <>
      <SnackBarProvider>
        <TasksProvider>
          <Navbar />
          <AddTask />
          <Routes>
            <Route path="" element={<ToDoList />} />
            <Route path="/activetodos" element={<ActiveToDos />} />
            <Route path="/completedtodos" element={<CompletedTodos />} />
          </Routes>
        </TasksProvider>
      </SnackBarProvider>
    </>
  );
}

export default App;
