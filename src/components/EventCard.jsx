import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className={`event-image event-category-${event.category.toLowerCase()}`}>
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} />
        ) : (
          <span className="event-placeholder">📅</span>
        )}
      </div>
      
      <div className="event-content">
        <div className="event-header">
          <span className={`event-badge badge-${event.category.toLowerCase()}`}>
            {event.category}
          </span>
          <span className="event-date">
            {new Date(event.date).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="event-title">{event.title}</h3>
        
        <p className="event-description">{event.description}</p>
        
        <div className="event-info">
          <span>📍 {event.venue}</span>
          <span>👥 {event._count?.registrations || 0} registered</span>
        </div>
        
        <Link to={`/events/${event.id}`} className="event-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;