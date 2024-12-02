import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskScreen from './components/TaskScreen';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Header from './components/Header';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false); // Ensure that loading is set to false once the fetch is complete
        }
    };
    
    fetchTasks();
}, []);

  // Add task
  const handleFormSubmit = async (task) => {
    const response = await axios.post('http://localhost:5000/api/tasks', task);
    setTasks([...tasks, response.data]);
  };

  // Update a task
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  // Delete a task
  const handleDelete = async (id) => {
    // Confirmation alert before deleting
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#facc15',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
        // Success alert after deletion
        Swal.fire({
          title: 'Deleted!',
          text: 'The task has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        // Error alert if deletion fails
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem deleting the task.',
          icon: 'error',
        });
      }
    }
  };

  // Edit a task
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const onToggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: task.completed === "true" ? "false" : "true" };
      const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask);
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? response.data : t))
      );
    } catch (err) {
      console.error('Error updating task completion status:', err);
    }
  };

  if (loading) {
    return (
        <Loader />
    );
  }

  return (
    <Router >
      <div>
        <Header/>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <TaskForm onSubmit={handleFormSubmit} initialData={editingTask} />
                <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
              </>
            }
          />
          <Route path='/task/:id' element={<TaskScreen onDelete={handleDelete} onUpdate={updateTask} onToggleComplete={onToggleComplete} />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
