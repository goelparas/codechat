import { UserActionType } from "./action.constants";
import { LoginType, SignUpType } from "./types";

export const authAction = (authDetails: SignUpType) => ({
    type: UserActionType.CREATE_USER,
    payload: authDetails
})

export const loginAction = (authDetails: LoginType) => ({
    type: UserActionType.LOGIN,
    payload: authDetails
})
export const loginCompleteAction = (authDetails: LoginType) => ({
    type: UserActionType.LOGIN_COMPLETED,
    payload: authDetails
})
export const authActionCompleteAction = (authDetails: SignUpType) => ({
    type: UserActionType.CREATE_USER_COMPLETED,
    payload: authDetails
})

export const getUserAction = () => ({
    type: UserActionType.GET_USER,
})
