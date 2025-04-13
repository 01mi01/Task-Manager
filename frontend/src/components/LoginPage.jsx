import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Navbar from "./Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("authToken", response.data.token);
      console.log("Logged in successfully:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#131315] relative">
      <div className="absolute w-[500px] h-[500px] bg-[#787bff] opacity-30 rounded-full blur-2xl animate-pulse" />
      <Navbar />

      <div className="z-10 w-full sm:w-96 bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-white">Log in to your account</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/10 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#787bff]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/10 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#787bff]"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center rounded-full bg-[#787bff] px-4 py-2 text-white font-semibold hover:bg-[#54bcb6] transition-all"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Don't have an account?{" "}
          <a href="/register" className="font-semibold text-[#787bff] hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
