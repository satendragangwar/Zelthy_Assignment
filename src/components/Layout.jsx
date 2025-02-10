import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaSun, FaMoon, FaUser, FaCalendar } from 'react-icons/fa';

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false; // Default to light mode
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div className="w-64 fixed h-full p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg">
          <div className="space-y-4">
            <div className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Slot booking App</div>
            
            {/* Navigation Links */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
            >
              <FaCalendar />
              <span>Availability</span>
            </Link>
            
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
            >
              <FaUser />
              <span>Profile</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 p-2 w-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout; 