import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Button from '../Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../css/FindQuestion.css";

const FindQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState({ title: '', tag: '', date: '' });
    const [visibleQuestions, setVisibleQuestions] = useState([]);
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);

    const fetchQuestions = async () => {
        const questionsCollection = collection(db, 'questions');
        const questionSnapshot = await getDocs(questionsCollection);
        const questionList = questionSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setQuestions(questionList);
        setVisibleQuestions(questionList);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const filteredQuestions = visibleQuestions.filter(question => {
        const titleMatch = filter.title === '' || (question.title && question.title.toLowerCase().includes(filter.title.toLowerCase()));
        const tagMatch = filter.tag === '' || (question.tags && question.tags.some(tag => tag.toLowerCase().includes(filter.tag.toLowerCase())));
        const dateMatch = filter.date === '' || (question.createdAt && new Date(question.createdAt.seconds * 1000).toISOString().split('T')[0] === filter.date);
        return titleMatch && tagMatch && dateMatch;
    });

    const removeQuestion = (id) => {
        setVisibleQuestions(prev => prev.filter(question => question.id !== id));
        if (expandedQuestionId === id) {
            setExpandedQuestionId(null);
        }
    };

    const toggleExpandQuestion = (id) => {
        setExpandedQuestionId(prevId => (prevId === id ? null : id));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(visibleQuestions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setVisibleQuestions(items);
    };

    return (
        <div className="find-question-page">

            <h1>Find Questions</h1>
<Link to="/">
                <Button text="Home" />
            </Link>
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

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="question-droppable">
                    {(provided) => (
                        <div
                            className="question-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question, index) => (
                                    <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className="question-card"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={() => toggleExpandQuestion(question.id)}
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
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
                                                
                                                {expandedQuestionId === question.id && (
                                                    <div className="expanded-details">
                                                        <p><strong>More Details:</strong></p>
                                                        <p>Posted By: {question.userEmail}</p>
                                                        <p>{question.additionalInfo}</p>
                                                        {question.imageUrls && question.imageUrls.length > 0 && (
                                                            <div className="image-gallery">
                                                                {question.imageUrls.map((imageUrl, index) => (
                                                                    <img key={index} src={imageUrl} alt={`Question Image ${index + 1}`} className="question-image" />
                                                                ))}
                                                            </div>
                                                        )}
                                                        <p className="click-to-collapse" onClick={() => toggleExpandQuestion(question.id)}>
                                                            Click to Collapse
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            ) : (
                                <p>No questions found.</p>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            
        </div>
    );
};

export default FindQuestion;
