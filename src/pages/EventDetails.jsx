import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    fetchEvent();
    if (user) {
      checkRegistration();
    }
  }, [id, user]);

  const fetchEvent = async () => {
    try {
      const { data } = await API.get(`/events/${id}`);
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Event not found');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    try {
      const { data } = await API.get('/users/my-registrations');
      const registered = data.some(reg => reg.eventId === id);
      setIsRegistered(registered);
    } catch (error) {
      console.error('Error checking registration:', error);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setRegistering(true);
      await API.post(`/events/${id}/register`);
      alert('Successfully registered for event! 🎉');
      setIsRegistered(true);
      fetchEvent();
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    if (window.confirm('Are you sure you want to unregister from this event?')) {
      try {
        setRegistering(true);
        await API.post(`/events/${id}/unregister`);
        alert('Successfully unregistered from event');
        setIsRegistered(false);
        fetchEvent();
      } catch (error) {
        alert(error.response?.data?.message || 'Unregistration failed');
      } finally {
        setRegistering(false);
      }
    }
  };

  if (loading) return <Loader />;
  if (!event) return <div className="not-found">Event not found</div>;

  const getCategoryColor = (category) => {
    const colors = {
      cultural: 'category-cultural',
      technical: 'category-technical',
      workshops: 'category-workshops',
      seminars: 'category-seminars',
      sports: 'category-sports',
    };
    return colors[category.toLowerCase()] || 'category-default';
  };

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        <div className="event-details-card">
          <div className={`event-banner ${getCategoryColor(event.category)}`}>
            {event.imageUrl ? (
              <img src={event.imageUrl} alt={event.title} className="banner-image" />
            ) : (
              <span className="banner-placeholder">📅</span>
            )}
          </div>

          <div className="event-details-content">
            <div className="event-details-header">
              <div>
                <h1 className="event-details-title">{event.title}</h1>
                <span className={`category-badge ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              <div className="event-status">
                <span className={`status-badge status-${event.status}`}>
                  {event.status}
                </span>
              </div>
            </div>

            <div className="event-info-grid">
              <div className="info-item">
                <span className="info-icon">📅</span>
                <div>
                  <div className="info-label">Date & Time</div>
                  <div className="info-value">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    <br />
                    {event.time}
                  </div>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <div className="info-label">Venue</div>
                  <div className="info-value">{event.venue}</div>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">👥</span>
                <div>
                  <div className="info-label">Registrations</div>
                  <div className="info-value">
                    {event._count.registrations}
                    {event.maxAttendees && ` / ${event.maxAttendees}`} registered
                  </div>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">⏰</span>
                <div>
                  <div className="info-label">Registration Deadline</div>
                  <div className="info-value">
                    {new Date(event.registrationDeadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="event-description-section">
              <h2 className="section-title">About This Event</h2>
              <p className="event-description">{event.description}</p>
            </div>

            <div className="organizer-section">
              <h3 className="section-title">Organized By</h3>
              <div className="organizer-info">
                <div className="organizer-avatar">
                  {event.organizer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="organizer-name">{event.organizer.name}</div>
                  <div className="organizer-email">{event.organizer.email}</div>
                  {event.organizer.phone && (
                    <div className="organizer-phone">📞 {event.organizer.phone}</div>
                  )}
                </div>
              </div>
            </div>

            {user && user.role === 'student' && (
              <div className="registration-section">
                {isRegistered ? (
                  <button
                    onClick={handleUnregister}
                    disabled={registering}
                    className="btn-unregister"
                  >
                    {registering ? 'Processing...' : 'Unregister from Event'}
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={registering || event.registrationStatus === 'closed'}
                    className="btn-register"
                  >
                    {registering
                      ? 'Registering...'
                      : event.registrationStatus === 'closed'
                      ? 'Registration Closed'
                      : 'Register for Event'}
                  </button>
                )}
              </div>
            )}

            {user && user.id === event.organizerId && (
              <div className="organizer-actions">
                <button
                  onClick={() => navigate(`/events/${id}/edit`)}
                  className="btn-edit"
                >
                  Edit Event
                </button>
                <button
                  onClick={() => navigate(`/events/${id}/attendees`)}
                  className="btn-attendees"
                >
                  View Attendees
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;