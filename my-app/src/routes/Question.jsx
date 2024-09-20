// Question.jsx
import React from 'react';
import TitleBox from './TitleBox';
import { TextArea } from 'semantic-ui-react'; // Importing TextArea from Semantic UI
import Tags from './Tags';
import '../css/PostPage.css'; // Importing CSS for styling

/**
 * Question component for posting a question.
 */
const Question = () => {
  return (
    <div className='PostSection'>
      <TitleBox text="Start your question with how, why, what, etc." />
      <p>Describe your problem:</p>
      <TextArea 
        placeholder="Enter a 1-paragraph description of your issue" 
        style={{
          height: 500, 
          width: 700, 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          borderRadius: '12px'
        }} 
      />
      <Tags text="question" />
    </div>
  );
};

export default Question;
