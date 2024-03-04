import { Reducer } from "@reduxjs/toolkit";
import { UserActionType } from "../actions/action.constants";
import { produce } from "immer";


export type UserState = {
    _id?: string;
    username?: string;
    dp?: string;
    
}


const initialState: UserState  = {
    
};

export const UserReducer :Reducer<UserState>= (state: UserState  = initialState, action: any) => 
produce(state, (draft: UserState ) => {
    
    switch (action.type) {
            case UserActionType.LOGIN_COMPLETED:
            case UserActionType.CREATE_USER_COMPLETED:
            {
                 draft._id = action.payload._id;
                 draft.dp = action.payload.dp;
                 draft.username = action.payload.username;
                 break;
            }
       default:
         break;
    }

});
