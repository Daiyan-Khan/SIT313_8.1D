import React, { useState } from 'react';
import { TextArea, Form } from 'semantic-ui-react';
import Tags from './Tags';
import ImageUploadComponent from '../ImageUpload'; 
import { db } from '../utils/firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import '../css/PostPage.css'; 

const Article = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(''); // State for current input tag
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (url) => {
    setImageUrls((prev) => [...prev, url]); // Add uploaded image URL to state
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) { // Add tag if not already in the list
      setTags((prevTags) => [...prevTags, currentTag]);
      setCurrentTag(''); // Clear the input field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem('userEmail');

    try {
      setLoading(true);

      // Prepare the article data, including image URLs
      const articleData = {
        title,
        abstract,
        body,
        tags,
        imageUrls, // Use the collected image URLs
        userEmail,
        createdAt: new Date(),
      };

      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'posts'), articleData);
      console.log('Article successfully written with ID: ', docRef.id);

      // Clear the form
      setTitle('');
      setAbstract('');
      setBody('');
      setTags([]);
      setImageUrls([]);
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='PostSection'>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label style={{ color: 'white' }}>Title</label>
          <input 
            placeholder="Enter article title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ 
              width: '100%', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: '12px', 
              padding: '10px',
              border: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
            }} 
          />
        </Form.Field>

        <Form.Field>
          <label style={{ color: 'white' }}>Abstract</label>
          <TextArea 
            placeholder="Enter a 1 paragraph abstract" 
            value={abstract} 
            onChange={(e) => setAbstract(e.target.value)} 
            style={{ minHeight: 50, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px' }} 
          />
        </Form.Field>

        <Form.Field>
          <label style={{ color: 'white' }}>Article Text</label>
          <TextArea 
            placeholder="Enter the full article text" 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            style={{ minHeight: 400, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px' }} 
          />
        </Form.Field>

        <ImageUploadComponent onUpload={handleImageUpload} />
        
        <div className="uploaded-images" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
          {imageUrls.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Uploaded ${index}`} 
              style={{ width: '100px', height: '100px', margin: '10px', borderRadius: '8px' }} 
            />
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <input 
            type="text" 
            value={currentTag} 
            onChange={(e) => setCurrentTag(e.target.value)} 
            placeholder="Add a tag" 
            style={{ 
              width: '80%', 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc',
              marginRight: '10px'
            }} 
          />
          <button type="button" onClick={handleAddTag} style={{ padding: '10px 15px', borderRadius: '5px' }}>
            +
          </button>
        </div>

        {/* Display added tags */}
        <div style={{ marginTop: '10px' }}>
          {tags.map((tag, index) => (
            <span key={index} style={{ 
              display: 'inline-block', 
              background: '#e0e0e0', 
              borderRadius: '12px', 
              padding: '5px 10px', 
              margin: '5px'
            }}>
              {tag}
            </span>
          ))}
        </div>

        <button type="submit" style={{ marginTop: '20px', padding: '10px 15px', borderRadius: '5px' }} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Article'}
        </button>
      </Form>
    </div>
  );
};

export default Article;
