// FeaturedArticles.js
import React from 'react';
import ArticleCard from './Card'; // Importing the reusable ArticleCard component

/**
 * FeaturedArticles component.
 * This component displays a section of featured articles,
 * rendering an ArticleCard for each article passed in through props.
 * 
 * @param {Array} articles - An array of article objects containing data to display.
 */
const FeaturedArticles = ({ articles }) => {
  return (
    <section className="featured-articles"> {/* Section for featured articles */}
      <h2>Featured Articles</h2> {/* Header for the section */}
      <div className="article-list"> {/* Container for the list of articles */}
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} /> 
        ))}                     {/* Render each ArticleCard with article data */}
      </div>
      <button>See all articles</button> {/* Button to view all articles */}
    </section>
  );
};

export default FeaturedArticles;
