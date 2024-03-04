import { SocketActionType } from "./action.constants";

export const createConnection = ()=>({
    type:SocketActionType.JOIN
})
export const disconnectConnection = ()=>({
    type:SocketActionType.DISCONNECTED
})
export const createConnectionComplete = (data:any)=>({
    type:SocketActionType.JOIN_COMPLETED,
    payload:data
})
export const removeConnection = (data:any)=>({
    type:SocketActionType.LEAVE,
    payload:data
})