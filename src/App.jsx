import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import UserAlbumsPage from './Pages/UserAlbumsPage';
import AlbumPhotosPage from './Pages/AlbumPhotosPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="/user/:userId" element={ <UserAlbumsPage/> } />
        <Route path="/album/:albumId" element={ <AlbumPhotosPage/> } />
      </Routes>
    </Router>
  );
};

export default App;
