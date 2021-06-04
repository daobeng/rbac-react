import React from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import { Context, users } from './utils';
import { AbilityContext } from './components/Can';
import defineRolesFor, { buildAbilityFor} from './config';
import withRole from './withRole';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const NotFound = () => <h1>404 Not Found </h1>

function ToggleUser() {
  const context = React.useContext(Context);
  const abilityContext = React.useContext(AbilityContext);

  const updateUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    context.updateUser(e.target.value)

    // update user roles when user changes / updates
    const roles = users[e.target.value as keyof typeof users].roles || []
    abilityContext.update(defineRolesFor(roles))
  }

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

// DENYING ROUTES
// const withITRole = withRole(['IT'])
// const ITContactRoute = withITRole(() => <Route path='/contact' exact component={ Contact } />, NotFound)

// MAIN application
const ability = buildAbilityFor([]); // begin with empty abilities

function App() {
  const [user, setUser] = React.useState<string>('basicUser')

  return (
    <Context.Provider
      value={{
        state: { user },
        updateUser: (a) => setUser(a)
      }}
    >
    <AbilityContext.Provider value={ ability }>
    <ToggleUser />
    <Router>
      <Switch>
        <Route path='/' exact component={ Home } />
        {/* <ITContactRoute /> */}
        <Route path='*' component={ NotFound } />
      </Switch>
    </Router>
    </AbilityContext.Provider>
    </Context.Provider>
  );
}

export default App;
