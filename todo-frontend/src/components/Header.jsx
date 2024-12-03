import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Persist theme
    }, [theme]);

    // Toggle theme on checkbox change
    const handleThemeChange = (e) => {
        const newTheme = e.target.checked ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <div>
            <nav className="flex justify-between bg-yellow-400 font-bold  py-2 px-4 md:py-4 md:px-8">
                <Link to="/" className="text-white text-3xl md:text-4xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">MyNotes</Link>
                <label className="grid cursor-pointer place-items-center">
                    <input
                        type="checkbox"
                        value={theme === "light"}
                        onChange={handleThemeChange}
                        className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1" />
                    <svg
                        className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path
                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <svg
                        className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>
            </nav>
        </div>
    )
}

export default Header