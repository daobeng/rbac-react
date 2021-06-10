import React from 'react';

import { Context, users } from './utils';

const withRole = (roles: Array<string>) => (Component: React.FC<any>, onDeny?: React.FC<any>) => (props: any) => {
    // get current user roles from context (can be from token for from redux store)
    const context = React.useContext(Context);
    const user = context.state.user as keyof (typeof users);
    const userRoles = users[user].roles || [];

    const hasAccess = userRoles.includes('superuser') || userRoles.some(r => roles.includes(r))
    if (hasAccess) return React.createElement(Component, props, null);

    if (onDeny) return React.createElement(onDeny, props, null);

    return null;
}

export default withRole;