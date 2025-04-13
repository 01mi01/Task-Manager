import React from "react";
import Navbar from "./Navbar";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#131315] relative">
      <div className="absolute w-[500px] h-[500px] bg-[#787bff] opacity-30 rounded-full blur-2xl animate-pulse"></div>

      <Navbar />
      <h1 className="text-5xl mb-6 text-white z-10 text-center font-semibold">
        Task Manager
      </h1>
      <h4 className="text-2xl mb-10 text-white z-10 text-center max-w-xl">
        Log in or sign up to start creating and managing your tasks
      </h4>
      <div className="flex gap-6 z-10">
  <a
    href="/login"
    className="bg-white/5 text-white px-6 py-3 rounded-full hover:bg-white/10 hover:text-[#67d4cf] transition-all duration-200 backdrop-blur-md"
  >
    Login
  </a>
  <a
    href="/register"
    className="bg-white/5 text-white px-6 py-3 rounded-full hover:bg-white/10 hover:text-[#67d4cf] transition-all duration-200 backdrop-blur-md"
  >
    Sign Up
  </a>
</div>


    </div>
  );
}

export default LandingPage;
