import React from 'react';
import { UserPreferences } from 'typescript';
import { Context, users } from '../utils';

const Home = () => {
    const context = React.useContext(Context);
    const user = context.state.user as keyof typeof users;
    return (
        <h1>Welcome to Home: { users[user].username }</h1>
    )
}

export default Home;