import React, { useState } from 'react';
import { TextArea, Form } from 'semantic-ui-react';
import Tags from './Tags';
import ImageUploadComponent from '../ImageUpload'; 
import { db } from '../utils/firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import '../css/PostPage.css'; 

const Article = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (url) => {
    setImageUrls((prev) => [...prev, url]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const userEmail = localStorage.getItem('userEmail');

    // Create an array to hold upload promises
    const uploadPromises = imageUrls.map(async (url) => {
      const response = await fetch(url); // Fetch the image data
      const blob = await response.blob(); // Convert to blob
      const storage = getStorage();
      const storageRef = ref(storage, `articles/${Date.now()}_${url.split('/').pop()}`); // Create a unique file path

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL
      return downloadURL;
    });

    try {
      setLoading(true);
      const uploadedImageUrls = await Promise.all(uploadPromises); // Wait for all uploads to complete

      const articleData = {
        title,
        abstract,
        body,
        tags,
        imageUrls: uploadedImageUrls, // Use the uploaded image URLs
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

        <button type="submit" style={{ marginTop: '20px', padding: '10px 15px', borderRadius: '5px' }} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Article'}
        </button>
      </Form>
  
      <Tags 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px' }} 
        text="article" 
      />
    </div>
  );
};

export default Article;
