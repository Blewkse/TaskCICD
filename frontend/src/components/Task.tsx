import React, { useState } from "react";
import Task from "../types/Tasks";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: Props) {
  const [isEditting, setIsEditting] = useState(false);
  const [activeTask, setActiveTask] = useState(task);

  const handleValidation = () => {
    setIsEditting(false);
    onEdit(activeTask);
  };

  return (
    <div>
      <input
        disabled={!isEditting}
        value={activeTask.name}
        onChange={(event) => {
          setActiveTask({ ...task, name: event.target.value });
        }}
      ></input>
      <div>
        <textarea
          disabled={!isEditting}
          value={activeTask.description}
          onChange={(event) => {
            setActiveTask({ ...task, description: event.target.value });
          }}
        ></textarea>
        <input
          type="checkbox"
          checked={activeTask.completed}
          disabled={!isEditting}
          onChange={(event) => {
            setActiveTask({ ...task, completed: event.target.checked });
          }}
        />
        <div>
          {isEditting ? (
            <button onClick={handleValidation}>Valider</button>
          ) : (
            <button onClick={() => setIsEditting(true)}>Edit</button>
          )}
          <button
            onClick={() => {
              onDelete(activeTask.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
