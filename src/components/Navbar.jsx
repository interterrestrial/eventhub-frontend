import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
            <span className="brand-text">EventHub</span>
          </Link>

          <div className="navbar-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/about" className="nav-link">About</Link>

            {user ? (
              <>
                {user.role === 'organizer' && (
                  <>
                    <Link to="/create-event" className="nav-link">Create Event</Link>
                    <Link to="/my-events" className="nav-link">My Events</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  </>
                )}
                {user.role === 'student' && (
                  <Link to="/my-registrations" className="nav-link">My Registrations</Link>
                )}
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/signup" className="btn-signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;