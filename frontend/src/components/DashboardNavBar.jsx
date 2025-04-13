import React from 'react';

export default function DashboardNavbar() {
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/'; 
  };

  return (
    <nav className="bg-[#0f1011] fixed top-0 left-0 w-full h-16 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="text-white text-xl font-medium">
            <a href="/">Task Manager</a>
          </div>

          <button
            onClick={handleLogout}
            className="text-white hover:text-[#787bff] px-3 py-2 rounded-md text-sm sm:text-base font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
