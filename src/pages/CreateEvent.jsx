import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import './CreateEvent.css';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'cultural',
    venue: '',
    date: '',
    time: '',
    registrationDeadline: '',
    maxAttendees: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await API.post('/events', formData);
      alert('Event created successfully! 🎉');
      navigate('/my-events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <div className="page-header">
          <h1 className="page-title">Create New Event</h1>
          <p className="page-subtitle">Fill in the details to create an amazing event</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-section">
            <h2 className="form-section-title">Basic Information</h2>
            
            <div className="form-group">
              <label className="form-label">Event Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                placeholder="Annual Tech Fest 2024"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
                placeholder="Describe your event in detail..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="cultural">Cultural</option>
                  <option value="technical">Technical</option>
                  <option value="workshops">Workshops</option>
                  <option value="seminars">Seminars</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Venue *</label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="form-input"
                  placeholder="Main Auditorium"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Schedule</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Event Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Event Time *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Registration Deadline *</label>
              <input
                type="date"
                required
                value={formData.registrationDeadline}
                onChange={(e) =>
                  setFormData({ ...formData, registrationDeadline: e.target.value })
                }
                className="form-input"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Additional Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Max Attendees (Optional)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  className="form-input"
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/my-events')}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;