import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import Loader from '../components/Loader';
import './MyRegistrations.css';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRegistrations();
  }, []);

  const fetchMyRegistrations = async () => {
    try {
      const { data } = await API.get('/users/my-registrations');
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnregister = async (eventId) => {
    if (window.confirm('Are you sure you want to unregister from this event?')) {
      try {
        await API.post(`/events/${eventId}/unregister`);
        alert('Successfully unregistered from event');
        fetchMyRegistrations();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to unregister');
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      cultural: 'badge-cultural',
      technical: 'badge-technical',
      workshops: 'badge-workshops',
      seminars: 'badge-seminars',
      sports: 'badge-sports',
    };
    return colors[category?.toLowerCase()] || 'badge-default';
  };

  return (
    <div className="my-registrations-page">
      <div className="my-registrations-container">
        <div className="page-header">
          <h1 className="page-title">My Registrations</h1>
          <p className="page-subtitle">Events you've registered for</p>
        </div>

        {loading ? (
          <Loader />
        ) : registrations.length > 0 ? (
          <div className="registrations-list">
            {registrations.map((registration) => (
              <div key={registration.id} className="registration-card">
                <div className="registration-content">
                  <div className="registration-header">
                    <h3 className="registration-title">
                      {registration.event.title}
                    </h3>
                    <span className={`category-badge ${getCategoryColor(registration.event.category)}`}>
                      {registration.event.category}
                    </span>
                  </div>

                  <p className="registration-description">
                    {registration.event.description}
                  </p>

                  <div className="registration-info">
                    <div className="info-row">
                      <span className="info-icon">📅</span>
                      <span>
                        {new Date(registration.event.date).toLocaleDateString()} at{' '}
                        {registration.event.time}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">📍</span>
                      <span>{registration.event.venue}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">👤</span>
                      <span>Organized by {registration.event.organizer.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">✅</span>
                      <span>
                        Registered on{' '}
                        {new Date(registration.registeredAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="registration-actions">
                    <Link
                      to={`/events/${registration.eventId}`}
                      className="btn-view-event"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleUnregister(registration.eventId)}
                      className="btn-unregister"
                    >
                      Unregister
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-registrations">
            <div className="no-registrations-icon">🎫</div>
            <h3 className="no-registrations-title">No Registrations Yet</h3>
            <p className="no-registrations-text">
              Explore exciting events and register to participate
            </p>
            <Link to="/events" className="btn-browse-events">
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;