
import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
}

const stateInit: State = {
    isLoading: false
}

export function uiReducer( state = stateInit, action: fromUI.Actions ) {
    switch ( action.type ) {
        
        case fromUI.ACTIVE_LOADING:
        return {
            isLoading: true
        };

        case fromUI.DISABLE_LOADING:
        return {
            isLoading: false
        };

        default:
        return state;
    }
}
