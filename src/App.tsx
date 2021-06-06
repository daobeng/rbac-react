import React from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import { Context, users } from './utils';
import { AbilityContext } from './components/Can';
import defineRolesFor, { buildAbilityFor} from './config';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const NotFound = () => <h1>404 Not Found </h1>

function ToggleUser() {
  const context = React.useContext(Context);
  const abilityContext = React.useContext(AbilityContext);

  const updateUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    context.updateUser(e.target.value)

    // update user roles when user changes / updates
    const user = users[e.target.value as keyof typeof users]
    abilityContext.update(defineRolesFor(user))
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

// MAIN application
// begin with empty abilities
const ability = buildAbilityFor({username: 'default', roles: []});

function Routes() {
  const abilityContext = React.useContext(AbilityContext);

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={ Home } />
        {
          abilityContext.can('read', 'Contact')
          && <Route path='/contact' exact component={ Contact } />
        }
        <Route path='*' component={ NotFound } />
      </Switch>
    </Router>
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
    <AbilityContext.Provider value={ ability }>
    <ToggleUser />
    <Routes />
    </AbilityContext.Provider>
    </Context.Provider>
  );
}

export default App;
