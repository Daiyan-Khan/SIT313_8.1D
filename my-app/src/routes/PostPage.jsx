import React, { useState } from 'react';
import { db } from '../utils/firebase'; // Firebase Firestore instance for database interaction
import Article from './Article'; // Component for article-specific form inputs
import Question from './Question'; // Component for question-specific form inputs
import PostTypeForm from './PostTypeForm'; // Component to toggle between post types (Article/Question)
import { Link } from 'react-router-dom'; // Link component for navigation between routes
import '../css/PostPage.css'; // CSS file for styling

/**
 * PostPage Component
 * Allows users to create either an article or question post, 
 * and submit it to the Firestore database.
 */
const PostPage = () => {
  // State for managing the type of post (article/question)
  const [postType, setPostType] = useState('question');

  // State for storing the image URL (optional for the post)
  const [imageURL, setImageURL] = useState('');

  // State for storing the content of the post (title, description, tags)
  const [postContent, setPostContent] = useState({ title: '', description: '', tags: '' });

  /**
   * Handle the post submission by saving it to Firestore.
   * The post data includes the post type, title, description, tags, and image URL.
   */
  const handlePost = async () => {
    try {
      // Add the post data to Firestore under the 'posts' collection
      await db.collection('posts').add({
        type: postType,
        title: postContent.title,
        description: postContent.description,
        tags: postContent.tags,
        image: imageURL,
        createdAt: new Date() // Timestamp for when the post was created
      });
      alert('Post added successfully!'); // Notify the user of successful post creation
    } catch (error) {
      console.error('Error posting:', error); // Log any errors that occur during the post process
    }
  };

  return (
    <div className="PostPage">
      <h1>What would you like to post today?</h1>

      {/* Form to toggle between 'article' and 'question' post types */}
      <PostTypeForm postType={postType} onChange={setPostType} />

      {/* Render the Article or Question form based on the selected post type */}
      {postType === 'article' 
        ? <Article setPostContent={setPostContent} /> 
        : <Question setPostContent={setPostContent} />
      }

      {/* Home Button - Navigates back to the home page */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/">
          <button style={{ padding: '10px 15px', borderRadius: '5px' }}>
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostPage;
