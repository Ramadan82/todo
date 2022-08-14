import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useTodosContext } from "./hooks/useTodosContext";
import { useAuthContext } from "../components/hooks/useAuthContext";

function Tododetails({ todo }) {
  const { dispatch } = useTodosContext();
  const { title, description, completed, createdAt } = todo;
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("api/todos/" + todo._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };
  return (
    <div className="todo-details">
      <h4>
        Title&nbsp;:&nbsp;&nbsp;
        {title}
      </h4>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Ccompleted?: </strong>
        {JSON.stringify(completed)}
      </p>
      {createdAt && (
        <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      )}
      <span className="delete-icon" onClick={handleClick}>
        <DeleteIcon style={{ color: "red" }} />
      </span>
      <span className="edit-icon" onClick={handleClick}>
        <EditIcon />
      </span>
      <span className="readMore-icon" onClick={handleClick}>
        <ReadMoreIcon />
      </span>
    </div>
  );
}

export default Tododetails;
