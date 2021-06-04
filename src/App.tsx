import React from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import { Context, users } from './utils';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
      <Route path='/' exact component={ Home } />
      <Route path='/contact' exact component={ Contact } />
    </Router>
    </Context.Provider>
  );
}

export default App;
