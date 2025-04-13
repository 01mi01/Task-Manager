import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-[#0f1011] fixed top-0 left-0 w-full h-16 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="text-white text-xl font-medium">
            <a href="/">Task Manager</a>
          </div>

          <div className="flex space-x-2 sm:space-x-4">
            <a
              href="/login"
              className="text-white px-3 py-2 rounded-md text-sm sm:text-base font-medium"
            >
              Login
            </a>
            <a
              href="/register"
              className="text-white px-3 py-2 rounded-md text-sm sm:text-base font-medium"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
