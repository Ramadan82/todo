import { useEffect } from "react";
import { useTodosContext } from "../components/hooks/useTodosContext";
import Tododetails from "../components/Tododetails";
import TodoForm from "../components/TodoForm";
import { useAuthContext } from "../components/hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const { todos, dispatch } = useTodosContext();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("api/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_TODO", payload: json });
      }
    };
    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="todos">
        {todos &&
          todos.map((todo) => <Tododetails key={todo._id} todo={todo} />)}
      </div>
      <TodoForm />
    </div>
  );
};

export default Home;
