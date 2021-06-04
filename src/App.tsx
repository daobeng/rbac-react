import React from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path='/' exact component={ Home } />
      <Route path='/contact' exact component={ Contact } />
    </Router>
  );
}

export default App;
