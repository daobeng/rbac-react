import React from 'react';

interface AppContext {
    state: { user: string },
    updateUser: (a: any) => void,
}

export const Context = React.createContext<AppContext>(undefined!);

// Defined roles
// basic user with either role 'basic' or no roles assigned
export const users = {
    basicUser: {
        username: 'John',
        roles: [] as Array<string>,
    },
    ITUser: {
        username: 'John',
        roles: ['IT'],
    },
    ITAndMarketing: {
        username: 'Jack',
        roles: ['marketing', 'IT'],
    },
    superUser: {
        username: 'Jake',
        roles: ['superuser'],
    }
}