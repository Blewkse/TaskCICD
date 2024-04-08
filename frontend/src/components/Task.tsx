import { useState } from "react";
import Task from "../types/Tasks";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTask, setActiveTask] = useState(task);

  const formatDate = (dateString: string | number | Date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options as Intl.DateTimeFormatOptions);
  };

  const handleValidation = () => {
    setIsEditing(false);
    onEdit(activeTask);
  };

  const handleInputChange = (key: keyof Task, value: string | boolean) => {
    setActiveTask({ ...activeTask, [key]: value });
  };


  
  return (
    <div className="task-item">
        <div className="task-top">
        <textarea
          className="task-name"
          disabled={!isEditing}
          value={activeTask.name}
          onChange={(event) => {
            handleInputChange("name", event.target.value);
          }}/>
          <div className="date">
          <p className="task-date">{formatDate(task.createdAt)}</p>
          </div>
        </div>
        <textarea
          className="task-description"
          disabled={!isEditing}
          value={activeTask.description}
          onChange={(event) => {
            handleInputChange("description", event.target.value);
          }}/>
        <div className="btns">
          {isEditing ? (
            <button onClick={handleValidation}>Confirm</button>
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
  );
}
