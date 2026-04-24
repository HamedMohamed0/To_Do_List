import { useEffect, useState } from "react";
import { useSnack } from "../hooks/useSnack";
import { useDispatch } from "../hooks/useDispatch";

export default function AddTask() {
  const dispatch = useDispatch();
  const { showHideSnackbar } = useSnack();
  const [taskName, setTaskName] = useState("");
  const [mainColor, setMainColor] = useState(() => {
    return localStorage.getItem("mainColor") || "#6366f1";
  });
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", mainColor);
    localStorage.setItem("mainColor", mainColor);
  }, [mainColor]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDescription.trim()) {
      showHideSnackbar("Please fill in all fields");
      return;
    }
    dispatch({
      type: "add",
      payload: {
        name: taskName,
        description: taskDescription,
      },
    });
    setTaskName("");
    setTaskDescription("");
    showHideSnackbar("Task added successfully");
  };
  const handleMainColor = (color) => {
    setMainColor(color);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row px-4 sm:px-auto  items-center justify-center gap-4 container mx-auto mt-14">
        <input
          type="text"
          placeholder="Add Task Name"
          className="bg-white/5 text-white/70 shadow-lg outline-none w-full lg:w-1/6 rounded-lg py-3 px-4 border-2 border-white/10 focus:border-[var(--primary)] transition-all duration-300 caret-white"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add Task Description"
          className="bg-white/5 text-white/70 shadow-lg outline-none w-full lg:w-1/2 rounded-lg py-3 px-4 border-2 border-white/10 focus:border-[var(--primary)] transition-all duration-300 caret-white"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-[var(--primary)] shadow-lg text-white font-semibold text-lg rounded-lg py-3 px-4 w-full lg:w-1/12 transition-all duration-300 hover:transform hover:scale-105"
        >
          Add
        </button>
        <div className="colors-buttons flex gap-2 items-center justify-center mt-4">
          <button
            className="w-5 h-5 rounded-full bg-indigo-500"
            onClick={() => handleMainColor("#6366f1")}
          ></button>
          <button
            className="w-5 h-5 rounded-full bg-amber-500"
            onClick={() => handleMainColor("#f59e0b")}
          ></button>
          <button
            className="w-5 h-5 rounded-full bg-teal-500"
            onClick={() => handleMainColor("#14b8a6")}
          ></button>
        </div>
      </div>
    </>
  );
}
