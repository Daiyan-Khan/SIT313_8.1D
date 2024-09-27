import { Link, useNavigate } from 'react-router-dom'; // For navigation
import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import "../css/FindQuestion.css";

const FindQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState({ title: '', tag: '', date: '' });

    // Fetch questions from Firestore
    const fetchQuestions = async () => {
        const questionsCollection = collection(db, 'questions'); // Replace 'questions' with your Firestore collection name
        const questionSnapshot = await getDocs(questionsCollection);
        const questionList = questionSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setQuestions(questionList);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    // Function to filter questions based on user input
    const filteredQuestions = questions.filter(question => {
        const titleMatch = filter.title === '' || (question.title && question.title.toLowerCase().includes(filter.title.toLowerCase()));
        const tagMatch = filter.tag === '' || (question.tags && question.tags.some(tag => tag.toLowerCase().includes(filter.tag.toLowerCase()))); // Adjusted for tags array
        const dateMatch = filter.date === '' || (question.createdAt && new Date(question.createdAt.seconds * 1000).toISOString().split('T')[0] === filter.date); // Date comparison

        return titleMatch && tagMatch && dateMatch;
    });

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
                            <h2>TITLE: {question.title}</h2>
                            <p>DESCRIPTION: {question.description}</p>
                            <p><strong>Tags:</strong> {question.tags ? question.tags.join(', ') : 'No tags'}</p> {/* Adjusted for tags array */}
                            <p><strong>Date:</strong> {new Date(question.createdAt.seconds * 1000).toLocaleDateString()}</p> {/* Displaying formatted date */}
                            <p><strong>Posted by:</strong> {question.userEmail}</p> {/* Adjusted to show email, assuming userEmail is stored */}
                         
                            {/* Add a button/link to view answers or solutions */}
                        </div>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
                
                <Link to="/">
                    <button style={{ padding: '10px 15px', borderRadius: '5px' }}>
                        Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FindQuestion;
