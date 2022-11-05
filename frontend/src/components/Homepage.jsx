import React from 'react';
// import About from './About';
// import Contact from './Contact';
// import Services from './Services';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <h1 className="display-4 fw-bolder mb-4 text-center text-white">Play the Quiz & Check Your Knowledge</h1>
                            <p className="lead text-center fs-4 mb-5 text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit obcaecati aut molestiae porro reiciendis consectetur maiores atque necessitatibus blanditiis provident.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Homepage;
