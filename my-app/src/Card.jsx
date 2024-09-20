// ArticleCard.js
import React from 'react';

/**
 * Reusable Card component to display articles or tutorials.
 *
 * @param {string} image - The source URL or path for the card's image.
 * @param {string} title - The title of the article/tutorial displayed on the card.
 * @param {string} description - A brief description of the article/tutorial.
 * @param {string} author - The author of the article/tutorial.
 * @param {number} rating - The rating of the article/tutorial (in stars).
 */
const Card = ({ image, title, description, author, rating }) => {
  return (
    // Container for each article or tutorial card with basic styling
    <div style={{ marginRight: 100 }} className="article-card">
      
      {/* Display the article's image */}
      <img className='cardimage' src={image} alt={title} />
      
      {/* Title of the article/tutorial */}
      <h2>{title}</h2>
      
      {/* Brief description of the article/tutorial */}
      <p>{description}</p>
      
      {/* Display the author */}
      <p>By {author}</p>
      
      {/* Display the rating of the article/tutorial */}
      <p>{rating} stars</p>
    </div>
  );
};

export default Card;
