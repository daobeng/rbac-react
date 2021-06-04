import React from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import { Context, users } from './utils';
import withRole from './withRole';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const NotFound = () => <h1>404 Not Found </h1>

function ToggleUser() {
  return (
    <Context.Consumer>
      {
        context => {
          const updateUser = (e: React.ChangeEvent<HTMLSelectElement>) => context.updateUser(e.target.value)

          return (
            <select value={ context.state.user } onChange={ updateUser }>
              {
                Object.keys(users).map(u => (
                  <option key={ u }>{ u }</option>
                ))
              }
            </select>
          )
        }
      }
    </Context.Consumer>
  )
}

// DENYING ROUTES
const withITRole = withRole(['IT'])
const ITContactRoute = withITRole(() => <Route path='/contact' exact component={ Contact } />, NotFound)

// MAIN application
function App() {
  const [user, setUser] = React.useState<string>('basicUser')

  return (
    <Context.Provider
      value={{
        state: { user },
        updateUser: (a) => setUser(a)
      }}
    >
    <ToggleUser />
    <Router>
      <Switch>
        <Route path='/' exact component={ Home } />
        <ITContactRoute />
        <Route path='*' component={ NotFound } />
      </Switch>
    </Router>
    </Context.Provider>
  );
}

export default App;
