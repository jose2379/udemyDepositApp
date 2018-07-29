import { Action } from "../../../node_modules/@ngrx/store";
import { Deposit } from "./deposit.model";

export const SET_ITEMS = '[DEPOSIT] Set Items';
export const UNSET_ITEMS = '[DEPOSIT] Unset Items';


export class SetItemsActions implements Action {
    readonly type = SET_ITEMS;
    constructor( public payload: Deposit[] ){}
}

export class UnsetItemsActions implements Action {
    readonly type = UNSET_ITEMS;
}

export type actions = SetItemsActions | UnsetItemsActions;
