import React, { useState } from 'react';
import TitleBox from './TitleBox';
import { TextArea } from 'semantic-ui-react';
import Tags from './Tags';
import { db } from '../utils/firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import '../css/PostPage.css';
import ImageUploadComponent from '../ImageUpload'; // Import the new component

const Question = () => {
  const [description, setDescription] = useState(''); // State for question description
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (url) => {
    setImageUrls((prev) => [...prev, url]); // Update the image URLs
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an array to hold upload promises
    const uploadPromises = imageUrls.map(async (url) => {
      const response = await fetch(url); // Fetch the image data
      const blob = await response.blob(); // Convert to blob
      const storage = getStorage();
      const storageRef = ref(storage, `questions/${Date.now()}_${url.split('/').pop()}`); // Create a unique file path

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL
      return downloadURL;
    });

    try {
      setLoading(true);
      const uploadedImageUrls = await Promise.all(uploadPromises); // Wait for all uploads to complete

      const questionData = {
        description,
        imageUrls: uploadedImageUrls, // Use the uploaded image URLs
        createdAt: new Date(), // Timestamp for the question
      };

      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'questions'), questionData);
      console.log('Question successfully written with ID: ', docRef.id);

      // Clear the form
      setDescription('');
      setImageUrls([]);
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='PostSection'>
      <TitleBox text="Start your question with how, why, what, etc." />
      <p>Describe your problem:</p>
      <TextArea 
        placeholder="Enter a 1-paragraph description of your issue" 
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description on change
        style={{
          height: 500, 
          width: 800, 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          borderRadius: '12px'
        }} 
      />
      
      <Tags text="question" />
      
      {/* Use the ImageUploadComponent here */}
      <ImageUploadComponent onUpload={handleImageUpload} />

      {/* Display uploaded images */}
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

      <button type="submit" onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 15px', borderRadius: '5px' }} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Question'}
      </button>
    </div>
  );
};

export default Question;
