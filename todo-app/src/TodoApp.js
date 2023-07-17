import React, { useState, useEffect } from 'react';
import DeleteIcon  from '@mui/icons-material/Delete';
import { CheckIcon } from '@heroicons/react/outline';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [taskChecked, setTaskChecked] = useState({});

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: task, completed: false }]);
      setTask('');
    }
  };

  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    setTaskChecked((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
  }));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'Active') {
      return !task.completed;
    } else {
      return task.completed;
    }
  });

  const completedTasks = tasks.filter((task) => task.completed);
  const shouldShowInput = filter !== 'Completed';
  const currentYear = new Date().getFullYear();

  return (
    <div className="container flex flex-col items-center mx-auto py-8 min-h-screen"
    >
      <h1 className="text-3xl font-bold text-center mb-4">#todo</h1>
      <div className="flex items-center mb-4">
        <button
          className={`mr-8 ${
            filter === 'All' ? 'font-bold' : 'text-gray-500'
          } focus:border-b-4 border-blue-500 ml-0 justify-self-start`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`mr-8 ${
            filter === 'Active' ? 'font-bold' : 'text-gray-500'
          } focus:border-b-4 border-blue-500 ml-16`}
          onClick={() => setFilter('Active')}
        >
          Active
        </button>
        <div>
        <button
          className={`mr-0 ${
            filter === 'Completed' ? 'font-bold' : 'text-gray-500'
          } focus:border-b-4 border-blue-500 ml-16 justify-self-end`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
        
        </div>
        </div>
        <div class="w-[608px] h-[0px] border border-stone-300"></div>
      {shouldShowInput && (
      <div className="flex items-center mb-4 mt-4">
        <input
          type="text"
          className="flex-grow-0 border border-gray-300 rounded-xl py-2 px-4 mr-2"
          placeholder="Add details"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="rounded-xl bg-blue-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200 hover:underline"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      )}
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            <span className="cursor-pointer" onClick={() => completeTask(task.id)}>
        {taskChecked[task.id] ? (
          <CheckIcon className="w-4 h-4 mr-2 inline-block text-green-500" />
        ) : (
          <div className="w-4 h-4 mr-2 border border-gray-400 rounded inline-block"></div>
        )}
        {task.title}
      </span>
            {filter === 'Completed' && (
      <button
        className="text-red-500 ml-2"
        onClick={() => removeTask(task.id)}
      >
        <DeleteIcon className="w-4 h-4" />
      </button>
    )}
    </li>
        ))}
      </ul>
      {filter === 'Completed' && (
        <div>
          {completedTasks.length > 0 && (
            <button
          className="flex items-center rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white ml-2"
          style={{ marginLeft: '700px'}}
          onClick={clearCompletedTasks}
          disabled={tasks.every((task) => !task.completed)}
        >
          <DeleteIcon className="w-4 h-4" /> delete all
        </button>
          )}
        </div>
      )}

      <footer className="mb-0 p-0 text-center mt-auto">
        <p>My Version of the Todo App</p>
        <p>Created by @JacklineKendi &copy; { currentYear }</p>
      </footer>
    </div>
  );
};

export default TodoApp;
