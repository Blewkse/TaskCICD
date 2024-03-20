import React, { useState } from "react";
import Task from "../types/Tasks";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: Props) {
  const [isEditting, setIsEditting] = useState(false);

  const handleValidation = () => {
    setIsEditting(false);
    const editedTask: Task = {
      title: task.title,
      id: task.id,
      description: task.description,
      completed: task.completed,
    };
    onEdit(editedTask);
  };

  return (
    <div>
      <input disabled={!isEditting} value={task.title}></input>
      <div>
        <textarea disabled={!isEditting} value={task.description}></textarea>
        <input
          type="checkbox"
          checked={task.completed}
          disabled={!isEditting}
        />
        <div>
          {isEditting ? (
            <button onClick={handleValidation}>Valider</button>
          ) : (
            <button onClick={() => setIsEditting(true)}>Edit</button>
          )}
          <button
            onClick={() => {
              onDelete(task.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
