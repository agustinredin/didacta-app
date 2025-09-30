import React from "react";
import AuthPage from "./components/AuthPage";
import UserProfile from './components/UserProfile'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App({ ejemplo }) {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/profile" element={<UserProfile/>} />
      </Routes>
    </Router>
  );
}
