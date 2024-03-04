import { RoomStateType } from "../reducer/room.reducer";
import { RoomCreationActionType } from "./action.constants";

export const createRoomAction = (roomDetails: RoomStateType) => (
    { type: RoomCreationActionType.CREATE_ROOM, payload: roomDetails })

export const updateRoom = (roomDetails: RoomStateType) => (
    { type: RoomCreationActionType.SOMEONE_JOINED, payload: roomDetails })
export const joinExistingRoom = (roomDetails: any) => (
    { type: RoomCreationActionType.JOIN_ROOM, payload: roomDetails })