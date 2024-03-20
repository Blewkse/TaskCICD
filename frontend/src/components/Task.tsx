import React, { useState } from "react";

type Task = {
  title: string;
  id: string;
  description: string;
  completed: boolean;
};

export default function Task({ title, id, description, completed }: Task) {
  const [isEditting, setIsEditting] = useState(false);

  const handleValidation = () => {
    setIsEditting(false);
  };

  return (
    <div>
      <input disabled={!isEditting} value={title}></input>
      <div>
        <textarea disabled={!isEditting} value={description}></textarea>
        <input type="checkbox" checked={completed} disabled={true} />
        <div>
          {isEditting ? (
            <button onClick={handleValidation}>Valider</button>
          ) : (
            <button onClick={() => setIsEditting(true)}>Edit</button>
          )}
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}
