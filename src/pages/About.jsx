import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About EventHub</h1>
          <p className="about-subtitle">Your Centralized College Event Management Portal</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2 className="section-heading">Our Mission</h2>
            <p className="section-text">
              EventHub aims to solve the chaos and disorganization in managing college events. 
              Students often miss event announcements posted on notice boards, coordinators 
              struggle with manual registrations, and tracking attendees becomes overwhelming. 
              We provide a comprehensive platform where students can discover upcoming events, 
              register online, and organizers can efficiently manage event details, attendee 
              lists, and venue bookings.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-heading">Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🔐</div>
                <h3 className="feature-title">Secure Authentication</h3>
                <p className="feature-text">JWT-based login with role-based access control</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📅</div>
                <h3 className="feature-title">Event Management</h3>
                <p className="feature-text">Create, update, and manage events seamlessly</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <h3 className="feature-title">Advanced Search</h3>
                <p className="feature-text">Filter and search events by category, date, venue</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Analytics Dashboard</h3>
                <p className="feature-text">Track registrations and event statistics</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <h3 className="feature-title">Attendee Management</h3>
                <p className="feature-text">View and export registered attendees list</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Responsive Design</h3>
                <p className="feature-text">Access from any device - mobile, tablet, or desktop</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-heading">Event Categories</h2>
            <div className="categories-list">
              <div className="category-item category-cultural">
                <span className="category-emoji">🎭</span>
                <span className="category-name">Cultural Events</span>
              </div>
              <div className="category-item category-technical">
                <span className="category-emoji">💻</span>
                <span className="category-name">Technical Fests</span>
              </div>
              <div className="category-item category-workshops">
                <span className="category-emoji">🎨</span>
                <span className="category-name">Workshops</span>
              </div>
              <div className="category-item category-seminars">
                <span className="category-emoji">📚</span>
                <span className="category-name">Seminars</span>
              </div>
              <div className="category-item category-sports">
                <span className="category-emoji">⚽</span>
                <span className="category-name">Sports Events</span>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-heading">Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-group">
                <h3 className="tech-heading">Frontend</h3>
                <ul className="tech-list">
                  <li>React.js</li>
                  <li>React Router</li>
                  <li>Axios</li>
                  <li>CSS3</li>
                </ul>
              </div>
              <div className="tech-group">
                <h3 className="tech-heading">Backend</h3>
                <ul className="tech-list">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>JWT Authentication</li>
                  <li>Bcrypt</li>
                </ul>
              </div>
              <div className="tech-group">
                <h3 className="tech-heading">Database</h3>
                <ul className="tech-list">
                  <li>MongoDB</li>
                  <li>Prisma ORM</li>
                  <li>MongoDB Atlas</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section cta-section">
            <h2 className="section-heading">Join EventHub Today</h2>
            <p className="section-text">
              Whether you're a student looking for exciting events or an organizer planning 
              the next big fest, EventHub is your go-to platform for seamless event management.
            </p>
            <div className="cta-buttons">
              <a href="/signup" className="cta-btn cta-primary">Get Started</a>
              <a href="/events" className="cta-btn cta-secondary">Browse Events</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;