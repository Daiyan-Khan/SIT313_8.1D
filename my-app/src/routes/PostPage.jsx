import React, { useState } from 'react';
import { db } from '../utils/firebase'; // Firebase Firestore instance
import ImageUpload from '../ImageUpload';
import Article from './Article';
import Question from './Question';
import PostTypeForm from './PostTypeForm';
import Button from '../Button';
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
      
      {/* Image upload */}

      <div className="ButtonSection">
        <Button onClick={handlePost} text={'Post'} />
      </div>
    </div>
  );
};

export default PostPage;
