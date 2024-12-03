import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Loader from "./Loader";
import api from "../api"

const TaskScreen = ({ onDelete, onUpdate }) => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateSuccessAlert, setUpdateSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`tasks/${id}`);
        setTask(response.data);
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(
        `/tasks/${id}`,
        task
      );
      setTask(response.data);
      onUpdate(response.data);
      setIsEditing(false);
      setUpdateSuccessAlert(true);
      setTimeout(() => setUpdateSuccessAlert(false), 2000);
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleToggleComplete = async () => {
    const updatedTask = { ...task, completed: !(task.completed === "true") };
    try {
      const response = await api.put(
        `/tasks/${id}`,
        updatedTask
      );
      setTask(response.data);
      onUpdate(response.data);
    } catch (err) {
      console.error("Error updating task completion status:", err);
    }
  };

  const handleDelete = async () => {
    await onDelete(id);
    navigate("/");
  };

  if (loading) {
    return (

      <Loader />

    );
  }

  return (
    <div className="relative min-h-screen py-10 px-5">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg rounded-lg p-6">
        {/* Success Alert */}
        {updateSuccessAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg font-medium text-green-800">
                Note successfully updated!
              </p>
              <button
                onClick={() => setUpdateSuccessAlert(false)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {isEditing ? (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Note</h1>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-500 transition duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-500 transition duration-200"
                  rows="5"
                ></textarea>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">{task.title}</h1>
              <input
                type="checkbox"
                checked={task.completed === "true"}
                onChange={handleToggleComplete}
                className=" p-3 sm:p-3 checkbox checkbox-sm bg-white border-yellow-600 focus:ring-yellow-400"
              />
            </div>
            <p className="text-lg text-gray-700 mb-6 whitespace-pre-wrap">{task.description}</p>


            <div className="my-5 ">
              <span
                className={`relative inline-flex items-center pl-8 pr-5 py-2 text-sm font-bold rounded-full tracking-wide shadow-lg ${task.completed === "true"
                  ? "bg-green-200 text-green-800 after:content-['✔'] after:absolute after:left-2 after:text-green-600"
                  : "bg-red-200 text-red-800 after:content-['✘'] after:absolute after:left-2 after:text-red-600"
                  }`}
              >
                {task.completed === "true" ? "Task Completed" : "Task Incomplete"}
              </span>

            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
              >
                <div className="flex items-center gap-1">
                  <FaEdit /> <p>Update</p>
                </div>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
              >
                <div className="flex items-center gap-1">
                  <FaTrash /> Delete
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskScreen;
