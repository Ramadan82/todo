import { createContext, useReducer } from "react";

export const TodosContext = createContext();
export const todoReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_TODO":
      return {
        todos: [action.payload, ...state.todos],
      };
    case "SET_TODO":
      return {
        todos: action.payload,
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((t) => t._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: null,
  });

  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
