import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  return (
    <div>
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TodoList;
