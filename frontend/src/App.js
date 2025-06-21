import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Report from './pages/Report';
import Admin from './pages/Admin';
import Stats from './pages/Stats';
import StatusChecker from './pages/StatusChecker';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        {/* Open to everyone */}
        <Route path="/" element={<Home />} />

        {/* Auth-only routes */}
        <Route
          path="/report"
          element={user ? <Report /> : <Navigate to="/login" />}
        />
        <Route
          path="/stats"
          element={user ? <Stats /> : <Navigate to="/login" />}
        />
       <Route
  path="/status"
  element={user ? <StatusChecker /> : <Navigate to="/login" />}
/>
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <Admin /> : <Navigate to="/login" />}
        />

        {/* Auth pages */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Redirect everything else to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
