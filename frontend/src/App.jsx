import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage'; 
import TestDashboard from './components/TestDashboard'; 


function App() {
  return (
    <Router>
      
      <div className="w-full h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/dashboard" element={<TestDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
