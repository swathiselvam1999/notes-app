import React from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks }) => {
    if (!tasks) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-5 min-h-screen flex flex-col items-center mb-10">
            {tasks.length === 0 ? (
                <h1 className="text-4xl text-center font-bold text-red-800">No Notes :(</h1>
            ) : (
                <>
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        My Notes
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                        {tasks.map((task) => (
                            <Link
                                key={task._id}
                                to={`/task/${task._id}`}
                                className={`p-6 rounded-xl shadow-md bg-yellow-100 hover:shadow-lg transform hover:scale-105 transition-all `}
                                style={{
                                    backgroundImage:
                                        'url("https://www.transparenttextures.com/patterns/light-paper-fibers.png")',
                                    borderTop: '6px solid #F59E0B', // "Sticky note" tab effect
                                    textDecoration: 'none',
                                }}
                            >
                                <h3
                                    className={`text-xl font-bold ${
                                        task.completed === "true" ? 'text-gray-500' : 'text-gray-800'
                                    }`}
                                >
                                    {task.title}
                                </h3>
                                <p
                                    className={`text-gray-700 mt-2 line-clamp-3 ${
                                        task.completed === "true" ? 'text-gray-400' : ''
                                    }`}
                                >
                                    {task.description}
                                </p>
                                <div className='mt-4'>
                                <span
                                    className={`mt-5 px-3 py-1 rounded-full text-sm font-semibold ${
                                        task.completed === "true"
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {task.completed === "true"
                                        ? 'Completed'
                                        : 'Incomplete'}
                                </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskList;
