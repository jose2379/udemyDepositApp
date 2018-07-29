import * as fromDeposit from './deposit.actions';
import { Deposit } from './deposit.model';

export interface DepositState {
    items: Deposit[];
}

const stateInit: DepositState = {
    items: []
}

export function DepositReducer( state = stateInit, action: fromDeposit.actions): DepositState {
    switch ( action.type ){
        case fromDeposit.SET_ITEMS:
        return {
            items: [
                ...action.payload.map ( item => {
                    return {
                        ...item
                    }
                })
            ]
        };

        case fromDeposit.UNSET_ITEMS:
        return {
            items: []
        };

        default:
        return state;
    }
}

