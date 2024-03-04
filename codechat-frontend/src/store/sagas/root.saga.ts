import { all, fork } from "redux-saga/effects";
import authsaga from "./auth.saga";
import { socketSaga } from "./socket.saga";


export default function *rootsaga(){
    yield all([fork(authsaga), fork(socketSaga)])
}