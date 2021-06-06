import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';
import { User } from './utils';

type Actions = 'manage' | 'create' | 'read' | 'delete';
type Subjects = 'MarketingView' | 'Contact' | 'Database' | 'Proposal' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>
export const AppAbility = Ability as AbilityClass<AppAbility>

// can be defined in a JSON or database to allow
const roleDefs = {
    'marketing': {
        'MarketingView': 'read',
        // 'Proposal': 'read',
    },
    'IT': {
        'Contact': ['read', 'create'],
        'Database': ['read', 'delete'],
        // 'Proposal': 'manage' // read-write access to everything
    }
}

export default function defineRulesFor(user: User) {
    const { can, cannot, rules } = new AbilityBuilder(AppAbility);

    // superUser roles definition
    if (user.roles.includes('superuser')) {
        can('manage', 'all');
    } else {
        // read from role definitions and define roles
        Object.entries(roleDefs).forEach(([role, roleDef]) => {
            if (user.roles.includes(role)) {
                Object.entries(roleDef).forEach(([subject, actions]) => {
                    can(actions as Actions | Actions[], subject as Subjects);
                })
            }
        })
    }

    // @ts-ignore
    can('manage', 'Proposal', {user: user.username})

    // // marketing user roles definition
    // if (roles.includes('marketing')) {
    //     can('read', 'MarketingView');
    // }

    // // IT user roles
    // if (roles.includes('IT')) {
    //     can(['read', 'create'], 'Contact');
    //     can(['delete', 'read'], 'Database');
    // }

    return rules;
}

export function buildAbilityFor(user: User): AppAbility {
    return new AppAbility(defineRulesFor(user));
}