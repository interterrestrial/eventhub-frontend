import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import Loader from '../components/Loader';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/dashboard/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Organizer Dashboard</h1>
            <p className="page-subtitle">Overview of your event management</p>
          </div>
          <Link to="/create-event" className="btn-create-event">
            + Create New Event
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <div className="stat-value">{stats?.totalEvents || 0}</div>
              <div className="stat-label">Total Events</div>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{stats?.totalRegistrations || 0}</div>
              <div className="stat-label">Total Registrations</div>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-value">{stats?.upcomingEvents || 0}</div>
              <div className="stat-label">Upcoming Events</div>
            </div>
          </div>

          <div className="stat-card stat-secondary">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats?.completedEvents || 0}</div>
              <div className="stat-label">Completed Events</div>
            </div>
          </div>
        </div>

        {/* Popular Events */}
        {stats?.popularEvents && stats.popularEvents.length > 0 && (
          <div className="popular-events-section">
            <h2 className="section-title">Most Popular Events</h2>
            <div className="popular-events-list">
              {stats.popularEvents.map((event, index) => (
                <div key={event.id} className="popular-event-item">
                  <div className="event-rank">#{index + 1}</div>
                  <div className="event-details">
                    <h3 className="event-name">{event.title}</h3>
                    <span className="event-category">{event.category}</span>
                  </div>
                  <div className="event-registrations">
                    <span className="registration-count">{event.registrations}</span>
                    <span className="registration-label">registrations</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/create-event" className="action-card action-primary">
              <div className="action-icon">➕</div>
              <div className="action-title">Create Event</div>
              <div className="action-description">Add a new event to your portfolio</div>
            </Link>

            <Link to="/my-events" className="action-card action-secondary">
              <div className="action-icon">📋</div>
              <div className="action-title">Manage Events</div>
              <div className="action-description">View and edit your existing events</div>
            </Link>

            <Link to="/profile" className="action-card action-accent">
              <div className="action-icon">👤</div>
              <div className="action-title">Profile Settings</div>
              <div className="action-description">Update your account information</div>
            </Link>

            <Link to="/events" className="action-card action-success">
              <div className="action-icon">🔍</div>
              <div className="action-title">Browse Events</div>
              <div className="action-description">Explore all campus events</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;