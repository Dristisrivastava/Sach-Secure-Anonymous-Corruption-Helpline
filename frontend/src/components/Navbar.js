import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload(); // refresh app state
  };

  return (
    <nav>
      <div className="container navbar">
        <div className="nav-left">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/report" className="nav-link">Report</Link>
          <Link to="/stats" className="nav-link">Stats</Link>
          <Link to="/status" className="nav-link">Track</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
        </div>
        <div className="nav-right">
          {user ? (
            <button onClick={logout} className="nav-button">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
