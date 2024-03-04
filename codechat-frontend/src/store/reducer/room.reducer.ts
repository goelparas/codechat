import { produce } from "immer"
import { Reducer } from "redux"
import { RoomCreationActionType } from "../actions/action.constants"
import { UserState } from "./user.reducer";
export type RoomStateType = {
    roomCode: string | null | undefined,
    roomMembers?: UserState[] |null,
    editorCode:string
}

const initialState: RoomStateType = {
    roomCode: null,
    roomMembers: [],
    editorCode:'console.log(Hello World!)'
}


export const RoomReducer: Reducer<RoomStateType> = (state: RoomStateType = initialState, action: any) =>
    produce(state, (draft: RoomStateType) => {

        switch (action.type) {
            case RoomCreationActionType.CREATE_ROOM:
                // here we need to pass the reuqest to the backend and check the room id exist if not create new and then pass some data. 
                draft.roomCode = action.payload.roomCode;
                break;
            case RoomCreationActionType.JOIN_ROOM:
                // here we need to know if the room still exist or not;
                
                draft.roomCode = action.payload.roomCode;
                break;
            case RoomCreationActionType.SOMEONE_JOINED:
                draft.roomMembers = [...action.payload.roomMembers];
                draft.editorCode = action.payload.editorCode,
                console.log(action.payload)
                break;
        }
    })