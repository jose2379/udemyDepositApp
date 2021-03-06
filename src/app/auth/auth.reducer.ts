
import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User;
}

const stateInit: AuthState = {
    user: null
}

export function authReducer( state = stateInit, action: fromAuth.actions) {
    switch( action.type ) {

        case fromAuth.SET_USER:
        return {
            user: { ... action.payload }
        };

        case fromAuth.UNSET_USER:
        console.log('reducer');
        return {
            user: null
        };

        default:
        return state;
    }
}
