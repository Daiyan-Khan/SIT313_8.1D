// Question.jsx
import React, { useState } from 'react';
import TitleBox from './TitleBox';
import { TextArea } from 'semantic-ui-react';
import Tags from './Tags';
import '../css/PostPage.css';
import ImageUploadComponent from '../ImageUpload'; // Import the new component

const Question = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = (url) => {
    setImageUrls((prev) => [...prev, url]); // Update the image URLs
  };

  return (
    <div className='PostSection'>
      <TitleBox text="Start your question with how, why, what, etc." />
      <p>Describe your problem:</p>
      <TextArea 
        placeholder="Enter a 1-paragraph description of your issue" 
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
    </div>
  );
};

export default Question;
