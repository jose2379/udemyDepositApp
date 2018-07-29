import { Action } from '@ngrx/store';

export const ACTIVE_LOADING = '[UI Loading] Loading';
export const DISABLE_LOADING = '[UI Loading] End Loading';

export class ActiveLoadingAction implements Action {
    readonly type = ACTIVE_LOADING;
}

export class DisableLoadingAction implements Action {
    readonly type = DISABLE_LOADING;
}

export type Actions = ActiveLoadingAction | DisableLoadingAction;
