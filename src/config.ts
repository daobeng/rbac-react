import { defineAbility, AbilityBuilder, Ability, AbilityClass } from '@casl/ability';

// subjects in my app and actions that can be performed on them
type Actions = 'manage' | 'create' | 'read' | 'delete';
type Subjects = 'MarketingView' | 'Contact' | 'Database' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>
export const AppAbility = Ability as AbilityClass<AppAbility>

export default function defineRulesFor(roles: Array<string>) {
    const { can, rules } = new AbilityBuilder(AppAbility);

    // superUser roles definition
    if (roles.includes('superuser')) {
        can('manage', 'all');
    }

    // marketing user roles definition
    if (roles.includes('marketing')) {
        can('read', 'MarketingView');
    }

    // IT user roles
    if (roles.includes('IT')) {
        can(['read', 'create'], 'Contact');
        can(['delete', 'read'], 'Database');
    }

    return rules;
}

export function buildAbilityFor(roles: Array<string>): AppAbility {
    return new AppAbility(defineRulesFor(roles))
}