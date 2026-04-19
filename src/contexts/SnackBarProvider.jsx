import { useState } from "react";
import { SnackBarContext } from "./SnackBarContext";
import SnackbarAlert from "../components/SnackbarAlert";

export const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideSnackbar(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }
  return (
    <SnackBarContext.Provider value={{ showHideSnackbar }}>
      <SnackbarAlert open={open} message={message} />
      {children}
    </SnackBarContext.Provider>
  );
};
