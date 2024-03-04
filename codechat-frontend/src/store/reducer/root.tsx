import { combineReducers  } from "redux";
import { UserReducer } from "./user.reducer";
import { RoomReducer } from "./room.reducer";
import { SocketReducer } from "./socket.reducer";



export const RootReducer = combineReducers({
    user: UserReducer,
    room: RoomReducer,
    socket:SocketReducer
})
