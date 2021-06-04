import React from 'react';
import { Link } from 'react-router-dom';
import { Context, users } from '../utils';
import withRole from '../withRole';

const MarketingView = withRole(['marketing'])(() => (
    <h1>Welcome Marketing Guru, You have access</h1>
))

const DeleteButton = withRole(['superuser'])((props) => {
    const { onClick } = props;

    return (
        <button className='deleteButton' onClick={ onClick }>Delete Database</button>
    )
})

const Home = () => {
    const context = React.useContext(Context);
    const user = context.state.user as keyof typeof users;
    return (
        <>
            <MarketingView />
            <h1>Welcome to Home: { users[user].username }</h1>
            <Link to='/contact'>Go to Contact</Link>
            <DeleteButton onClick={ () => alert('database dropped') } />
        </>
    )
}

export default Home;