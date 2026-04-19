import { useContext } from "react";
import { SnackBarContext } from "../contexts/SnackBarContext";

export const useSnack = () => {
  return useContext(SnackBarContext);
};
