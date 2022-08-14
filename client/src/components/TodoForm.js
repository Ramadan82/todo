import { useState } from "react";
import { useTodosContext } from "./hooks/useTodosContext";
import { useAuthContext } from "./hooks/useAuthContext";

const TodoForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useTodosContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("false");
  const [error, setError] = useState(null);

  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a todo");
      return;
    }
    const todo = { title, description, completed };
    console.log(todo);
    const response = await fetch("api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError("");
      setTitle("");
      setDescription("");
      setCompleted("");
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Todo </h3>
      <label>Todo Title</label>
      <input
        value={title}
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Todo Description</label>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={emptyFields.includes("description") ? "error" : ""}
      />
      <label>Todo Completed?</label>
      <select
        value={completed}
        onChange={(e) => setCompleted(e.target.value)}
        className={emptyFields.includes("completed") ? "error" : ""}
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <button type="submit">submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default TodoForm;
