import { useContext } from "react";
import { TodosContext } from "../context/TodosContex";

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw Error(
      "useTodosContext must be used inside a WorkoutsContextProvider"
    );
  }

  return context;
};
