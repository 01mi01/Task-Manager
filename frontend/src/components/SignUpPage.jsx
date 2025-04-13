import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Navbar from "./Navbar";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      setSuccess("Registration successful!");
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setSuccess("");
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to register");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#131315] relative px-4 sm:px-6">
      <div className="absolute w-[280px] sm:w-[400px] lg:w-[500px] h-[280px] sm:h-[400px] lg:h-[500px] bg-[#787bff] opacity-30 rounded-full blur-2xl animate-pulse" />

      <Navbar />

      <div className="z-10 w-full max-w-md bg-white/5 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Create your account
          </h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/10 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#787bff]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/10 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#787bff]"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full flex justify-center rounded-full bg-[#787bff] px-4 py-2 text-white font-semibold hover:bg-[#54bcb6] transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-[#787bff] hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
