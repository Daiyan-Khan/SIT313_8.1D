import { Link } from 'react-router-dom'; // For navigation
import React, { useEffect, useState, useRef } from 'react';
import { db } from '../utils/firebase'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import Draggable from 'react-draggable'; // Import Draggable from react-draggable
import Button from '../Button'; // Import the Button component
import "../css/FindQuestion.css";

const FindQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState({ title: '', tag: '', date: '' });
    const [visibleQuestions, setVisibleQuestions] = useState([]);
    const [expandedQuestionId, setExpandedQuestionId] = useState(null); // State to track expanded question
    const containerRef = useRef(null); // Ref for the question list container

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
        // If the removed question is expanded, close it
        if (expandedQuestionId === id) {
            setExpandedQuestionId(null);
        }
    };

    // Function to toggle the expanded state of a question
    const toggleExpandQuestion = (id) => {
        setExpandedQuestionId(prevId => (prevId === id ? null : id)); // Toggle expand/collapse
    };

    // Function to handle drag stop and rearrange the question order based on overlapping
    const handleDragStop = (e, questionId) => {
        const draggedQuestionIndex = visibleQuestions.findIndex(q => q.id === questionId);
        const draggedRect = e.target.getBoundingClientRect();
        let newOrder = [...visibleQuestions];

        newOrder.forEach((q, index) => {
            if (q.id !== questionId) {
                const targetQuestion = document.getElementById(q.id);
                const targetRect = targetQuestion.getBoundingClientRect();
                
                // Check if dragged overlaps with the current target
                if (draggedRect.top < targetRect.bottom && draggedRect.bottom > targetRect.top) {
                    const overlapHeight = Math.min(draggedRect.bottom, targetRect.bottom) - Math.max(draggedRect.top, targetRect.top);
                    const totalHeight = targetRect.bottom - targetRect.top;

                    if (overlapHeight > totalHeight / 2) {
                        // More than half overlap, snap above
                        if (draggedQuestionIndex > index) {
                            newOrder.splice(index, 0, newOrder.splice(draggedQuestionIndex, 1)[0]);
                        }
                    } else {
                        // Less than half overlap, snap below
                        if (draggedQuestionIndex < index) {
                            newOrder.splice(index + 1, 0, newOrder.splice(draggedQuestionIndex, 1)[0]);
                        }
                    }
                }
            }
        });

        setVisibleQuestions(newOrder);
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
            <div className="question-list" ref={containerRef}>
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question, index) => (
                        <Draggable
                            key={question.id}
                            axis="y"
                            bounds={`parent`} // Limit dragging within the parent container
                            onStop={(e) => handleDragStop(e, question.id)} // Handle drag stop
                        >
                            <div
                                id={question.id}
                                className="question-card"
                                style={{ position: 'relative' }}
                                onClick={() => toggleExpandQuestion(question.id)} // Restored expand on click functionality
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click on button from triggering the card click
                                        removeQuestion(question.id);
                                    }}
                                    className="remove-button"
                                    title="Remove Question"
                                >
                                    &times;
                                </button>
                                <h2>{question.title}</h2>
                                <p>DESCRIPTION: {question.description}</p>
                                <p><strong>Tags:</strong> {question.tags ? question.tags.join(', ') : 'No tags'}</p>
                                <p><strong>Date:</strong> {new Date(question.createdAt.seconds * 1000).toLocaleDateString()}</p>
                                
                                {/* Expanded Details */}
                                {expandedQuestionId === question.id && (
                                    <div className="expanded-details">
                                        <p><strong>More Details:</strong></p>
                                        <p>Posted By: {question.userEmail}</p>
                                        <p>{question.additionalInfo}</p>
                                        
                                        {/* Image Display */}
                                        {question.imageUrls && question.imageUrls.length > 0 && (
                                            <div className="image-gallery">
                                                {question.imageUrls.map((imageUrl, index) => (
                                                    <img key={index} src={imageUrl} alt={`Question Image ${index + 1}`} className="question-image" />
                                                ))}
                                            </div>
                                        )}

                                        {/* Click to Collapse Text */}
                                        <p className="click-to-collapse" onClick={(e) => {
                                            e.stopPropagation(); // Prevent click inside expanded area from collapsing
                                            toggleExpandQuestion(question.id);
                                        }}>
                                            Click to Collapse
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Draggable>
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
