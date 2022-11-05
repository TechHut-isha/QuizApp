import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {Link }from 'react-router-dom'

const AddQuestions = (props) => {
    // question title
    const [questionTitle, setQuestionTitle] = useState('');
    const [QuizTitle, setQuizTitle] = useState('');
    const [Instructions, setInstructions] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [difficulty, setDifficulty] = useState(0);
    const [type, setType] = useState('');
    const counter = Number(localStorage.getItem('questionCounter'));
    const [count, setCount] = useState(counter);

    // question options
    const [questionOptionFirst, setQuestionOptionFirst] = useState('');
    const [questionOptionSecond, setQuestionOptionSecond] = useState('');
    const [questionOptionThird, setQuestionOptionThird] = useState('');
    const [questionOptionFourth, setQuestionOptionFourth] = useState('');

    useEffect(() => {
        async function fetch() {
            const quizid = (localStorage.getItem('QuizId'));
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:4000/quizes/${quizid}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },

            });
            console.log(res);
            setQuizTitle(res.data.name);
            setInstructions(res.data.instructions);
        }
        fetch();
    }, [])
    // TODO: this is to send Data to Global State
    const addNewQuestion = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            question: questionTitle,
            answers: [
                {
                    key: 1,
                    option: questionOptionFirst,
                },
                {
                    key: 2,
                    option: questionOptionSecond,
                },
                {
                    key: 3,
                    option: questionOptionThird,
                },
                {
                    key: 4,
                    option: questionOptionFourth,
                },
            ],
            answer: correctAnswer,
            difficulty: difficulty,
            type: 'single'
        });
        // /:quizId/addquestion
        const quizid = (localStorage.getItem('QuizId'));
        const token = localStorage.getItem('token');
        const res = await axios.post(`http://localhost:4000/quizes/${quizid}/addquestion`, body, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });
    };
    function handleCounter(){
        setCount(count + 1);
        localStorage.setItem('questionCounter', count);
    }

    return (
        <div>

            <h1 className="display-4 fw-bolder mb-4 text-center" style={{color: 'rgb(0, 101, 219)'}}>Add New Question</h1>
            <div className="results mt-5 container shadow my-5">
                <h3 className="display-6 fw-bolder mb-5 text-center">Quiz Title: {QuizTitle} </h3>
                <p style={{color:'red', textAlign: 'center'}}>Instructions: {Instructions}</p>
                <h5 style={{color:'green', textAlign: 'center'}}>Number of Question Added: {count}</h5>  
                <form onSubmit={(e) => addNewQuestion(e)}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="question-title">Question Title : </label>
                                <input
                                    required
                                    value={questionTitle}
                                    onChange={(e) => setQuestionTitle(e.target.value)}
                                    type="text"
                                    min="40"
                                    max="100"
                                    className="form-control form-control-lg"
                                    id="question-title"
                                    aria-describedby="question-title"
                                    placeholder="Add Your Question Title Here!"
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h5 className="my-4">Options:</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="question-title">Option 1:</label>
                                        <input
                                            required
                                            type="text"
                                            min="40"
                                            max="100"
                                            className="form-control"
                                            id="question-title"
                                            aria-describedby="question-title"
                                            placeholder="Add Question Option 1"
                                            value={questionOptionFirst}
                                            onChange={(e) => setQuestionOptionFirst(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="question-title">Question Option 2:</label>
                                        <input
                                            required
                                            type="text"
                                            min="40"
                                            max="100"
                                            className="form-control"
                                            id="question-title"
                                            aria-describedby="question-title"
                                            placeholder="Add Question Option 2"
                                            value={questionOptionSecond}
                                            onChange={(e) => setQuestionOptionSecond(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="question-title">Question Option 3:</label>
                                        <input
                                            required
                                            type="text"
                                            min="40"
                                            max="100"
                                            className="form-control"
                                            id="question-title"
                                            aria-describedby="question-title"
                                            placeholder="Add Question Option 3"
                                            value={questionOptionThird}
                                            onChange={(e) => setQuestionOptionThird(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="question-title">Question Option 4:</label>
                                        <input
                                            required
                                            type="text"
                                            min="40"
                                            max="100"
                                            className="form-control"
                                            id="question-title"
                                            aria-describedby="question-title"
                                            placeholder="Add Question Option 4"
                                            value={questionOptionFourth}
                                            onChange={(e) => setQuestionOptionFourth(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="correctAnswer">Correct Answer key</label>
                                        <input
                                            required
                                            type="Number"
                                            className="form-control"
                                            id="correctAnswer"
                                            aria-describedby="correctAnswer"
                                            placeholder="Add What Should be the Number of Correct Answer!"
                                            value={correctAnswer}
                                            onChange={(e) => setCorrectAnswer(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="difficulty">Difficulty Level</label>
                                        <input
                                            required
                                            type="Number"
                                            className="form-control"
                                            id="difficulty"
                                            aria-describedby="difficulty"
                                            placeholder="Add difficulty!"
                                            value={difficulty}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3 mb-4 justify-content-center">
                                <div className="col-md-6">
                                    {count < 10 ? (<button
                                        onClick={handleCounter}
                                        type="submit"
                                        className="btn btn-lg btn-block btn-primary"
                                    >
                                        Add Question
                                    </button>) : (<Link to='/CeationDone'><button
                                        className="btn btn-lg btn-block btn-primary"
                                    >
                                        Done Creation!
                                    </button></Link>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuestions