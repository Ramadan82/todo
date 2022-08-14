import { useAuthContext } from "./useAuthContext";
import { useTodosContext } from "./useTodosContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  //alias the todos dispatch function to differentiate it with the user dispatch
  const { dispatch: dispatchTodos } = useTodosContext();

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    //dispatch settodo action to update global todos state to null

    dispatchTodos({ type: "SET_TODO", payload: null });
  };
  return { logout };
};
