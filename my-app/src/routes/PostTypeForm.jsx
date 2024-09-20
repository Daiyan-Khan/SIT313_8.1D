// PostTypeForm.js
import '../css/PostTypeForm.css'; // Importing CSS for styling
import React from 'react';

/**
 * PostTypeForm component.
 * Allows users to select the type of post (Question or Article).
 */
const PostTypeForm = ({ postType, onChange }) => {
  const handlePostTypeChange = (event) => {
    onChange(event.target.value); // Update the post type in the parent component
  };

  return (
    <form className='PostTypeForm'> {/* Class name corrected from 'class' to 'className' */}
      <label>
        <input
          onChange={handlePostTypeChange}
          type="radio"
          name="type"
          value="question"
          checked={postType === 'question'} // Check if the current post type is 'question'
        />
        Question
      </label>
      <label>
        <input
          onChange={handlePostTypeChange}
          type="radio"
          name="type"
          value="article"
          checked={postType === 'article'} // Check if the current post type is 'article'
        />
        Article
      </label>
    </form>
  );
};

export default PostTypeForm;
