import { all, takeLatest ,put} from "redux-saga/effects";
import { SocketActionType } from "../actions/action.constants";
import { socketService } from "../../services/Socket";
import { createConnectionComplete } from "../actions/sockets.action";


function* initSocket():any { 
const response =  yield socketService.initialiseSocket();
if(response)
 yield put(createConnectionComplete(response));
}

export function* socketSaga() {
    yield all([takeLatest(SocketActionType.JOIN, initSocket)])
}


