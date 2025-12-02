import { useState, useEffect } from 'react';
import API from '../utils/api';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sortBy: 'date',
    page: 1,
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/events', { params: filters });
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="page-title">All Events</h1>

        {/* Filters */}
        <div className="filters-card">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
                className="filter-select"
              >
                <option value="">All Categories</option>
                <option value="cultural">Cultural</option>
                <option value="technical">Technical</option>
                <option value="workshops">Workshops</option>
                <option value="seminars">Seminars</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Search</label>
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value, page: 1 })}
                className="filter-select"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="createdAt">Recently Added</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <Loader />
        ) : events.length > 0 ? (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="no-events">
            <p>No events found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;