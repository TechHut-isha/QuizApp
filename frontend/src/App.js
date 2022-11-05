import React from 'react';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Footer from './components/Footer';
import Studentpage from './components/Studentpage';
import AdminPage from './components/AdminPage';
import AddQuestions from './components/AddQuestions';
import CreationDone from './components/CreationDone';
import ResultPage from './components/ResultPage';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Studentpage" element={<Studentpage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/AddQuestions" element={<AddQuestions />} />
          <Route path="/CreationDone" element={<CreationDone />} />
          <Route path="/ResultPage" element={<ResultPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
