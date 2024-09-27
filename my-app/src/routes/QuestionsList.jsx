import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsData);
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id} className="question-item">
          <h2>TITLE: {question.title}</h2>
          <p>DESCRIPTION: {question.description}</p>
          <div>
            <strong>Tags:</strong>
            {question.tags.join(', ') || 'No tags'}
          </div>
          <div>
            <strong>Date:</strong> {new Date(question.createdAt.seconds * 1000).toLocaleString()}
          </div>
          <div>
            <strong>Posted by:</strong> {question.userEmail}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
