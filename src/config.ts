// thoughts, too big with such limited functionality
// native support seems to be coming for react but certainly not the greatest
// something homegrown can likely be implemented that will simply
// possibility to tie BE and FE
// or perhaps we'll stick with node-casbin for mo

import { User } from './utils';
import { Authorizer } from 'casbin.js';

// can be defined in a JSON or database to allow
const permDefs = {
    'marketing': {
        'read': ['MarketingView', 'Proposal'],
    },
    'IT': {
        'read': ['Contact', 'Database'],
        'delete': ['Database']
    }
}

export const casbinAuthorizer = new Authorizer('manual');

export default function defineRulesFor(user: User) {
    // superUser roles definition
    const builtPerms: Record<string, any> = {}
    user.roles.forEach((role) => {
        const permissions = permDefs[role as keyof typeof permDefs];
        Object.entries(permissions).forEach(([key, value]) => {
            builtPerms[key] = [...(builtPerms[key] || []), ...value]
        })
    })

    casbinAuthorizer.setPermission(builtPerms);
}
