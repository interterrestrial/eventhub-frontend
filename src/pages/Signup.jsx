import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    phone: '',
    college: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== FORM SUBMITTED ===');
    console.log('Form data:', { ...formData, password: '***' });
    
    setError('');
    setLoading(true);

    try {
      await register(formData);
      console.log('Registration successful, navigating to /events');
      navigate('/events');
    } catch (err) {
      console.error('Registration error caught:', err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
      alert('Error: ' + errorMessage); // Temporary alert for debugging
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">Join EventHub today</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label className="form-label">I am a *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="student">Student</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+91 9876543210"
              />
            </div>

            <div className="form-group">
              <label className="form-label">College/University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="form-input"
                placeholder="Rishihood University"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Department/Branch</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-input"
              placeholder="Computer Science"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{' '}
          <Link to="/login" className="signup-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
