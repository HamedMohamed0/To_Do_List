import { useContext } from "react";
import { DispatchContext } from "../contexts/DispatchContext";
export const useDispatch = () => useContext(DispatchContext);
