import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
    const a = useLocation();
    return <div>
        <section id="home">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <h1 className="display-4 fw-bolder mb-4 text-center text-white"><h1>Your Score is {a.state.score}</h1></h1>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default ResultPage;