import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import CalculatePage from './pages/CalculatePage';  // Import CalculatePage
import MainPage from './pages/MainPage'; // Import MainPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/calculate" element={<CalculatePage />} />  {/* Route for CalculatePage */}
        <Route path="/mainpage" element={<MainPage />} />  {/* Add route for MainPage */}
      </Routes>
    </Router>
  );
}

export default App;
