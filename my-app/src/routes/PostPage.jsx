import React, { useState } from 'react';
import { db } from '../utils/firebase'; // Firebase Firestore instance
import Article from './Article';
import Question from './Question';
import PostTypeForm from './PostTypeForm';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../css/PostPage.css';

const PostPage = () => {
  const [postType, setPostType] = useState('question');
  const [imageURL, setImageURL] = useState('');
  const [postContent, setPostContent] = useState({ title: '', description: '', tags: '' });

  const handlePost = async () => {
    try {
      await db.collection('posts').add({
        type: postType,
        title: postContent.title,
        description: postContent.description,
        tags: postContent.tags,
        image: imageURL,
        createdAt: new Date()
      });
      alert('Post added successfully!');
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <div className="PostPage">
      <h1>What would you like to post today?</h1>
      <PostTypeForm postType={postType} onChange={setPostType} />
      {postType === 'article' ? <Article setPostContent={setPostContent} /> : <Question setPostContent={setPostContent} />}

      {/* Home Button */}
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