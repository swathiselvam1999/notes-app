import React, { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false); // For error alert
  const [showSuccess, setShowSuccess] = useState(false); // For success alert

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title === "" && description === "") {
      setShowAlert(true); // Show error alert if fields are empty
      setShowSuccess(false); // Hide success alert
      return;
    }
    
    onSubmit({ title, description }); // Call the onSubmit function
    setTitle(""); // Clear title
    setDescription(""); // Clear description
    setShowAlert(false); // Hide error alert if form is filled
    setShowSuccess(true); // Show success alert
    setTimeout(() => setShowSuccess(false), 2000); // Hide success alert after 3 seconds
  };

  return (
    <div className="flex flex-col items-center py-10 px-4">
      {/* Error Alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium text-yellow-800">
              Please fill all the fields
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium text-green-800">
              Note successfully added!
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg  p-4 md:p-6 border border-yellow-400">
        <div className="collapse collapse-plus">
          <input type="checkbox" id="section-1" className="peer hidden" />
          <label
            htmlFor="section-1"
            className="collapse-title text-xl md:text-2xl font-semibold cursor-pointer text-yellow-800 bg-yellow-100 p-2 md:p-4 rounded-lg hover:bg-yellow-200 transition-all"
          >
            Add New Note
          </label>
          <div className="collapse-content overflow-hidden transition-all duration-300 peer-checked:mt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-yellow-700 text-lg font-medium"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Note Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-yellow-700 text-lg font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Note Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-yellow-300 rounded-lg h-28 resize-none focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
