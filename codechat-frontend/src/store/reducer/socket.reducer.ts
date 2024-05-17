import { produce } from "immer";
import { Reducer } from "redux";
import { SocketActionType } from "../actions/action.constants";
import { Socket } from "socket.io-client";


type SocketType = {
    instance: Socket |undefined;

}

const initialState = {
    instance: undefined,
   
}
export const SocketReducer: Reducer<SocketType> = (state: SocketType = initialState, action: any) =>
    produce(state, (draft: SocketType) => {

        switch (action.type) {
            case SocketActionType.JOIN_COMPLETED: {

                draft.instance = action.payload;
                break;

            }
            case SocketActionType.DISCONNECTED: {
                draft.instance = undefined
                break;

            }
            default:
                break;

        }
    })