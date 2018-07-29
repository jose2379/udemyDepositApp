import { Action } from "../../../node_modules/@ngrx/store";
import { User } from "./user.model";

export const SET_USER = '[Auth] Set User';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor( readonly payload: User ){}
}

export type actions = SetUserAction;
