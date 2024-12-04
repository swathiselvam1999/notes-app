import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskScreen from './components/TaskScreen';
import Swal from 'sweetalert2';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Header from './components/Header';
import api from './api';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
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
    const response = await api.post('/tasks', task);
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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#facc15',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'w-72 text-sm p-4', // Tailwind classes for width, font-size, and padding
        title: 'text-base',        // Smaller title font
        content: 'text-xs',       // Smaller content font
        confirmButton: 'text-xs px-4 py-2', // Smaller button fonts
        cancelButton: 'text-xs px-4 py-2',
      },
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'The task has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'w-72 text-sm p-4',
            title: 'text-base',
            content: 'text-xs',
          },
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem deleting the task.',
          icon: 'error',
          customClass: {
            popup: 'w-72 text-sm p-4',
            title: 'text-base',
            content: 'text-xs',
          },
        });
      }
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
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <TaskForm onSubmit={handleFormSubmit} />
                <TaskList tasks={tasks} />
              </>
            }
          />
          <Route path='/task/:id' element={<TaskScreen onDelete={handleDelete} onUpdate={updateTask} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
