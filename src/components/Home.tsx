import React from 'react';
import { Link } from 'react-router-dom';
import { Context, users } from '../utils';
import Can from './Can';

const MarketingView = () => (
    <h1>Welcome Marketing Guru, You have access</h1>
)

const DeleteButton = (props: any) => {
    const { onClick } = props;

    return (
        <button className='deleteButton' onClick={ onClick }>Delete Database</button>
    )
}

// Has access to edit entity
const proposal = {
    name: 'My sample Proposal',
    budget: 5000,
    user: 'Mary',
}

const Home = () => {
    const context = React.useContext(Context);
    const user = context.state.user as keyof typeof users;

    return (
        <>
            <Can action='read' subject='MarketingView'>
                <MarketingView />
            </Can>

            <h1>Welcome to Home: { users[user].username }</h1>
            <Link to='/contact'>Go to Contact</Link>

            <Can action='delete' subject='Database'>
                <DeleteButton onClick={ () => alert('database dropped') } />
            </Can>
        </>
    )
}

export default Home;