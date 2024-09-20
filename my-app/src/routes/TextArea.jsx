// TextAreaMinimumHeight.jsx
import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import '../css/TextArea.css';

/**
 * A TextArea component with a minimum height.
 * @param {string} placeholder - Placeholder text for the TextArea.
 */
const TextAreaMinimumHeight = ({ placeholder }) => {
  return (
    <Form className='TextForm'>
      <TextArea 
        placeholder={placeholder} 
        style={{ minHeight: 100 }} // Set a minimum height
      />
    </Form>
  );
};

export default TextAreaMinimumHeight;
