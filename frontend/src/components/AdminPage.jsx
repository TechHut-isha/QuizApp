import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    quizname: '',
    instructions: '',
    questions: []
  })
  const handleInput = (event) => {
    let name = event.target.name
    let value = event.target.value

    setQuiz({ ...quiz, [name]: value })
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify({
      name: quiz.quizname,
      instructions: quiz.instructions,
      questions: []
    });
    console.log(body);
    const token = localStorage.getItem('token');
    localStorage.setItem('questionCounter', 0);
    const res = await axios.post('http://localhost:4000/quizes/createQuiz', body, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
    });
    localStorage.setItem('QuizId', res.headers.quizid);
    if(res.status === 200){
      navigate('/AddQuestions');
    }
  }

  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <h1 className="display-4 fw-bolder mb-4 text-center text-white">This is the Admin Page</h1>
              <p className="lead text-center fs-4 mb-5 text-white">You can create quiz for the students here.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Hello, Admin</h1>
            <p className="l   ead text-center">Check The Knowledge of Your Students. By Creating A Quiz</p>
          </div>
          <div className="col-md-6 p-5">
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Quiz Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="quizname"
                  value={quiz.quizname}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputInstructions" className="form-label">
                  Instructions
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputInstructions"
                  name="instructions"
                  value={quiz.instructions}
                  onChange={handleInput}
                />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="exampleInputQuestion" className="form-label">
                  Question
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputQuestion"
                  name="question"
                  value={quiz.question}
                // onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputOption" className="form-label">
                  Option
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputOption"
                  name="option"
                  value={quiz.option}
                // onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputType" className="form-label">
                  Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputType"
                  name="type"
                  value={quiz.type}
                // onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputAnswer" className="form-label">
                  Answer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAnswer"
                  name="answer"
                  value={quiz.option}
                // onChange={handleInput}
                />
              </div> */}
              {/* <Link to='/AddQuestions' state={{quizname:quiz.quizname, instructions: quiz.instructions}}> */}
              <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
                Create Quiz
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage;