import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/api";
import { Task } from "../types/Tasks";

export default function Task({ title, id, description, completed }: Task) {
  const [isEditting, setIsEditting] = useState(false);

  const handleValidation = () => {
    setIsEditting(false);
    const task: Task = { title, id, description, completed };
    updateTask(task);
  };

  return (
    <div>
      <input disabled={!isEditting} value={title}></input>
      <div>
        <textarea disabled={!isEditting} value={description}></textarea>
        <input type="checkbox" checked={completed} disabled={!isEditting} />
        <div>
          {isEditting ? (
            <button onClick={handleValidation}>Valider</button>
          ) : (
            <button onClick={() => setIsEditting(true)}>Edit</button>
          )}
          <button
            onClick={() => {
              deleteTask(id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
