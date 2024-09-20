// Article.js
import React, { useState } from 'react';
import TitleBox from './TitleBox'; // Importing TitleBox component for the article title
import { TextArea, Form } from 'semantic-ui-react'; // Importing Semantic UI components for form elements
import Tags from './Tags'; // Importing Tags component for tagging the article
import ImageUploadComponent from '../ImageUpload'; // Import the ImageUploadComponent
import '../css/PostPage.css'; // Importing CSS for styling the PostPage

/**
 * Article component.
 * This component will render form for creating a new article, 
 * including fields for a title, abstract, article text, and tags.
 */
const Article = () => {
  const [imageUrls, setImageUrls] = useState([]); // State to hold uploaded image URLs

  const handleImageUpload = (url) => {
    setImageUrls((prev) => [...prev, url]); // Update the image URLs
  };

  return (
    <div className='PostSection'> {/* Container for the article post section */}
      <TitleBox 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px' }} 
        text="Enter a descriptive title" 
      />

      <Form> {/* Form for article input */}
        <Form.Field>
          <label>Abstract</label>
          <TextArea 
            placeholder="Enter a 1 paragraph abstract" 
            style={{ minHeight: 50, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px' }} 
          />
        </Form.Field>

        <Form.Field>
          <label>Article Text</label>
          <TextArea 
            placeholder="Enter the full article text" 
            style={{ minHeight: 400, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px' }} 
          />
        </Form.Field>

        {/* Image upload component */}
      </Form>
  
      <Tags 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px' }} 
        text="article" 
      />
      {/* Display uploaded images */}
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
    </div>
  );
};

export default Article;
