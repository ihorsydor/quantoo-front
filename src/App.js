import React from 'react';
import Container from '@mui/material/Container';
import {
  BrowserRouter
} from "react-router-dom";
import Navigation from './components/navigation';
import Router from './App.router'; 

function App() {
  return (
    <Container>
    <BrowserRouter>
      <div>
        <Navigation/>
        <Router />
      </div>
    </BrowserRouter>
  </Container>
  );
}

export default App;
