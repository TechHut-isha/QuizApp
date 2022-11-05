import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Studentpage = () => {
  const [current,setCurrent] = useState(0);
  const options = [];
  const [question,setQuestion] = useState('');
  const [currentOption,setCurrentOption] = useState([]);
  const [score,setScore] = useState(0);

  useEffect(() => {
    async function fetch(){
      const quizid = (localStorage.getItem('QuizId'));
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:4000/quizes/${quizid}/questions` ,{
      headers:{
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      });
      for(let i =0 ;i<4;i++){
        options.push(res.data[current].answers[i].option);
      }
      setCurrentOption(options);
      setQuestion(res.data[current].question);
    }
    fetch();
  }, [current])
  return (
    <div>
      <section id="quiz">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <h1 className="display-4 fw-bolder mb-4 text-center text-white">Play the Quiz & Check Your Knowledge</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container shadow my-5 outerbox">
        <div>
          <h3>score: {score}</h3>
          <input className='box  shadow my-5 ' disabled={true} value={`Quesno.). ${current + 1} ${question}`} />
          <div className="row justify-content-center">
            <div className="col-md-0">
              <div className="form-group">
                <div className='mb-3'>
                  <button className='optionbtn'>{'a) ' + currentOption[0]} </button>
                </div>
                <div className='mb-3'>
                <button className='optionbtn'>{'b) ' + currentOption[1]} </button>
                </div>
                <div className='mb-3'>
                <button className='optionbtn'>{'c) ' + currentOption[2]} </button>
                </div>
                <div className='mb-3'>
                <button className='optionbtn'>{'d) ' + currentOption[3]} </button>
                </div>
              </div>
            </div>
          </div>
          { current < 10 ?
          (<button onClick={() => {setCurrent(current + 1); setScore(score+50)}} type="submit" className="btn btn-primary w-100 mt-4 mb-4 rounded-pill">
            Next
          </button>) : (<Link to='/ResultPage' state={{score:score}}><button type="submit" className="btn btn-primary w-100 mt-4 mb-4 rounded-pill">
            Result
          </button></Link>)}
        </div>

      </div>
    </div>
  )
}

export default Studentpage