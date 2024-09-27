import { Link } from 'react-router-dom'; // For navigation
import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import Button from '../Button'; // Import the Button component
import "../css/FindQuestion.css";

const FindQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState({ title: '', tag: '', date: '' });
    const [visibleQuestions, setVisibleQuestions] = useState([]);

    // Fetch questions from Firestore
    const fetchQuestions = async () => {
        const questionsCollection = collection(db, 'questions'); // Replace 'questions' with your Firestore collection name
        const questionSnapshot = await getDocs(questionsCollection);
        const questionList = questionSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setQuestions(questionList);
        setVisibleQuestions(questionList); // Initialize visible questions
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    // Function to filter questions based on user input
    const filteredQuestions = visibleQuestions.filter(question => {
        const titleMatch = filter.title === '' || (question.title && question.title.toLowerCase().includes(filter.title.toLowerCase()));
        const tagMatch = filter.tag === '' || (question.tags && question.tags.some(tag => tag.toLowerCase().includes(filter.tag.toLowerCase()))); // Adjusted for tags array
        const dateMatch = filter.date === '' || (question.createdAt && new Date(question.createdAt.seconds * 1000).toISOString().split('T')[0] === filter.date); // Date comparison

        return titleMatch && tagMatch && dateMatch;
    });

    // Function to remove a question from the visible list
    const removeQuestion = (id) => {
        setVisibleQuestions(prev => prev.filter(question => question.id !== id));
    };

    return (
        <div className="find-question-page">
            <h1>Find Questions</h1>

            {/* Filter Section */}
            <div className="filter-section">
                <input
                    type="text"
                    placeholder="Filter by title"
                    value={filter.title}
                    onChange={(e) => setFilter({ ...filter, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Filter by tag"
                    value={filter.tag}
                    onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
                />
                <input
                    type="date"
                    value={filter.date}
                    onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                />
            </div>

            {/* Question List Section */}
            <div className="question-list">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map(question => (
                        <div key={question.id} className="question-card">
                            <button
                                onClick={() => removeQuestion(question.id)}
                                className="remove-button"
                                title="Remove Question"
                            >
                                &times;
                            </button>
                            <h2>TITLE: {question.title}</h2>
                            <p>DESCRIPTION: {question.description}</p>
                            <p><strong>Tags:</strong> {question.tags ? question.tags.join(', ') : 'No tags'}</p> {/* Adjusted for tags array */}
                            <p><strong>Date:</strong> {new Date(question.createdAt.seconds * 1000).toLocaleDateString()}</p> {/* Displaying formatted date */}
                            <p><strong>Posted by:</strong> {question.userEmail}</p> {/* Adjusted to show email, assuming userEmail is stored */}
                        </div>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
                
                <Link to="/">
                    <Button text="Home" />
                </Link>
            </div>
        </div>
    );
};

export default FindQuestion;
