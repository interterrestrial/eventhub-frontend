import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import './MyEvents.css';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const { data } = await API.get('/users/my-events');
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await API.delete(`/events/${eventId}`);
        alert('Event deleted successfully');
        fetchMyEvents();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete event');
      }
    }
  };

  return (
    <div className="my-events-page">
      <div className="my-events-container">
        <div className="my-events-header">
          <div>
            <h1 className="page-title">My Events</h1>
            <p className="page-subtitle">Manage all your created events</p>
          </div>
          <Link to="/create-event" className="btn-create-event">
            + Create New Event
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : events.length > 0 ? (
          <>
            <div className="events-stats">
              <div className="stat-card">
                <div className="stat-value">{events.length}</div>
                <div className="stat-label">Total Events</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {events.filter(e => e.status === 'upcoming').length}
                </div>
                <div className="stat-label">Upcoming</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {events.reduce((sum, e) => sum + (e._count?.registrations || 0), 0)}
                </div>
                <div className="stat-label">Total Registrations</div>
              </div>
            </div>

            <div className="events-grid">
              {events.map((event) => (
                <div key={event.id} className="event-card-wrapper">
                  <EventCard event={event} />
                  <div className="event-actions">
                    <Link to={`/events/${event.id}`} className="btn-view">
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-events">
            <div className="no-events-icon">📅</div>
            <h3 className="no-events-title">No Events Created Yet</h3>
            <p className="no-events-text">
              Start creating amazing events for your college community
            </p>
            <Link to="/create-event" className="btn-create-first">
              Create Your First Event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;