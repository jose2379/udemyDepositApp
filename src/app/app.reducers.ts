
import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// import * as fromDeposit from './deposit/deposit.reducer';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    // deposit: fromDeposit.DepositState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    // deposit: fromDeposit.DepositReducer
}
