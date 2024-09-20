// Article.js
import React from 'react';
import TitleBox from './TitleBox'; // Importing TitleBox component for the article title
import { TextArea, Form } from 'semantic-ui-react'; // Importing Semantic UI components for form elements
import Tags from './Tags'; // Importing Tags component for tagging the article
import '../css/PostPage.css'; // Importing CSS for styling the PostPage

/**
 * Article component.
 * This component will render form for creating a new article, 
 * including fields for a title, abstract, article text, and tags.
 */
const Article = () => {
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
      </Form>
      
      <Tags 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px' }} 
        text="article" 
      />
    </div>
  );
};

export default Article;
