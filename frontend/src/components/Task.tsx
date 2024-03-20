import React, { useState } from "react";
import Task from "../types/Tasks";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTask, setActiveTask] = useState(task);

  const handleValidation = () => {
    setIsEditing(false);
    onEdit(activeTask);
  };

  const handleInputChange = (key: keyof Task, value: string | boolean) => {
    setActiveTask({ ...activeTask, [key]: value });
  };

  return (
    <div>
      <input
        disabled={!isEditing}
        value={activeTask.name}
        onChange={(event) => {
          handleInputChange("name", event.target.value);
        }}
      ></input>
      <div>
        <textarea
          disabled={!isEditing}
          value={activeTask.description}
          onChange={(event) => {
            handleInputChange("description", event.target.value);
          }}
        ></textarea>
        <input
          type="checkbox"
          checked={activeTask.isCompleted}
          disabled={!isEditing}
          onChange={(event) => {
            handleInputChange("isCompleted", event.target.checked);
          }}
        />
        <div>
          {isEditing ? (
            <button onClick={handleValidation}>Valider</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
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
