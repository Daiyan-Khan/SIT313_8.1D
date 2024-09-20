// Tags.jsx
import React from 'react';
import '../css/Tags.css';
import { Input } from 'semantic-ui-react';

/**
 * Tags component for adding descriptive tags to a post.
 * @param {string} text - Descriptive text for the tags.
 */
const Tags = ({ text }) => {
  return (
    <div className="Tags" style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor="tagsInput" style={{ marginRight: 10 }}>Tags:</label>
      <Input 
        id="tagsInput" 
        placeholder={`Add up to 3 tags to describe what your ${text} is about, e.g., Java`} 
        style={{ width: '100%' }} 
      />
    </div>
  );
};

export default Tags;
