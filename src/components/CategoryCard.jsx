import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category, icon, description, colorClass }) => {
  return (
    <div className={`category-card ${colorClass}`}>
      <div className="category-icon-wrapper">
        <span className="category-icon">{icon}</span>
      </div>
      <h3 className="category-title">{category}</h3>
      <p className="category-description">{description}</p>
      <Link to={`/events?category=${category.toLowerCase()}`} className="category-link">
        →
      </Link>
    </div>
  );
};

export default CategoryCard;