import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import './Home.css';

const Home = () => {
  const categories = [
    {
      category: 'Cultural',
      icon: '🎭',
      description: 'Fests, music, dance & drama',
      colorClass: 'bg-pink',
    },
    {
      category: 'Technical',
      icon: '💻',
      description: 'Hackathons, coding & tech talks',
      colorClass: 'bg-blue',
    },
    {
      category: 'Workshops',
      icon: '📐',
      description: 'Skill development & training',
      colorClass: 'bg-orange',
    },
    {
      category: 'Seminars',
      icon: '🎤',
      description: 'Guest lectures & talks',
      colorClass: 'bg-green',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Discover & Join
                <br />
                <span className="hero-highlight">Campus Events</span>
              </h1>
              <p className="hero-description">
                Your centralized platform for exploring all the college and university events,
                competitions, seminars and many more.......
              </p>
              <div className="hero-buttons">
                <Link to="/events" className="btn-primary">
                  Explore Events →
                </Link>
                <Link to="/signup" className="btn-secondary">
                  Create Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <div className="categories-container">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find events that match your interest</p>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.category} {...cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;