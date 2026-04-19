import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import clsx from "clsx";
import { useTasks } from "../hooks/useTasks";
import { useDispatch } from "../hooks/useDispatch";
import { useSnack } from "../hooks/useSnack";

export default function Task({ taskDetails }) {
  const dispatch = useDispatch();
  const todos= useTasks();
  const { showHideSnackbar } = useSnack();
  const { id, name, description, isCompleted } = taskDetails;
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState({
    editedTitle: name,
    editedDescription: description,
  });
  let [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  const handleCompleted = () => {
    dispatch({ type: "complete", payload: { id } });
    todos.map((task) => {
      if (task.id === id && task.isCompleted) {
        showHideSnackbar("Task remove from completed list");
      } else {
        showHideSnackbar("Task completed successfully");
      }
    });
  };
  const showAlert = () => {
    setIsOpen(true);
  };
  const handleDeleted = () => {
    dispatch({ type: "delete", payload: { id } });
    showHideSnackbar("Task deleted successfully");
  };
  const handleEdit = () => {
    setShowEdit(true);
  };
  const ConfirmEdit = () => {
    dispatch({ type: "edit", payload: { id, ...editTask } });
    showHideSnackbar("Task edited successfully");
    setShowEdit(false);
  };
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="task text-white bg-white/5 rounded-xl px-12 py-4 flex justify-between items-center shadow-md border-2 border-white/10 duration-300 hover:border-[var(--primary)] hover:-translate-y-2 hover:py-6">
          <div className="task-info">
            <h3
              className={`text-2xl font-semibold text-[var(--primary)] mb-2 ${isCompleted ? "line-through decoration-teal-400" : ""}`}
            >
              {name}
            </h3>
            <p
              className={`text-base text-white/70 ${isCompleted ? "line-through decoration-teal-400" : ""}`}
            >
              {description}
            </p>
          </div>
          <div className="task-actions text-2xl flex items-center gap-12">
            <button
              onClick={showAlert}
              className="delete border border-white/10 rounded-full p-4 transition-all duration-300 hover:bg-white/10"
            >
              <FaTrashCan className="text-red-500" />
            </button>
            <button
              onClick={handleEdit}
              className="edit border border-white/10 rounded-full p-4 transition-all duration-300 hover:bg-white/10"
            >
              <FaPen className="text-[var(--primary)]" />
            </button>
            <button
              className={`complete border border-white/10 rounded-full p-4 transition-all duration-300 hover:bg-white/10 ${isCompleted ? "bg-green-500 hover:bg-green-600" : ""}`}
              onClick={handleCompleted}
            >
              <FaCheck
                className={isCompleted ? "text-white/70" : "text-green-500"}
              />
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 border-2 border-white/10 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-xl font-medium text-[var(--primary)] mb-5"
              >
                Are you sure you want to delete this task?
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50 mb-5">
                This action cannot be undone. The task will be permanently
                removed from your list.
              </p>
              <div className="mt-4 flex gap-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md duration-300 bg-red-600 hover:bg-red-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={handleDeleted}
                >
                  Delete
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md duration-300 bg-gray-600 hover:bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  Cancle
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {showEdit === true ? (
        <div className=" fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40 flex justify-center items-center">
          <div className="w-full max-w-2xl p-8 rounded-xl flex flex-col gap-8 bg-opacity-100 bg-[#171b22] shadow-md border-2 border-white/10">
            <Field>
              <Label className="text-lg/6 font-medium text-[var(--primary)]">
                Title
              </Label>
              <Description className="text-sm/6 text-white/50">
                Edit Your Title
              </Description>
              <Input
                className={clsx(
                  "mt-3 block w-full rounded-lg border-2 border-white/10 bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:outline-none outline-none focus:border-2 focus:border-[var(--primary)] duration-300",
                )}
                value={editTask.editedTitle}
                onChange={(e) =>
                  setEditTask({ ...editTask, editedTitle: e.target.value })
                }
              />
            </Field>
            <Field>
              <Label className="text-lg/6 font-medium text-[var(--primary)]">
                Description
              </Label>
              <Description className="text-sm/6 text-white/50">
                Edit Your Description
              </Description>
              <Input
                className={clsx(
                  "mt-3 block w-full rounded-lg border-2 border-white/10 bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:outline-none outline-none focus:border-2 focus:border-[var(--primary)] duration-300",
                )}
                value={editTask.editedDescription}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    editedDescription: e.target.value,
                  })
                }
              />
            </Field>
            <Button
              onClick={ConfirmEdit}
              className="inline-flex w-fit items-center gap-2 rounded-md duration-300 bg-green-700 hover:bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
            >
              Save changes
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
