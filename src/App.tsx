import React from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import { Context, users } from './utils';
import defineRulesFor from './config';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const NotFound = () => <h1>404 Not Found </h1>

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={ Home } />
          <Route path='/contact' exact component={ Contact } />
        <Route path='*' component={ NotFound } />
      </Switch>
    </Router>
  )
}

// specify user
const gUser = 'ITUser';
defineRulesFor(users[gUser]);

function App() {
  const [user, setUser] = React.useState<string>(gUser)

  return (
    <Context.Provider
      value={{
        state: { user },
        updateUser: (a) => setUser(a)
      }}
    >
    <Routes />
    </Context.Provider>
  );
}

export default App;
