import { takeLatest, all, put } from "redux-saga/effects";
import { UserActionType } from "../actions/action.constants";
import { apiService } from "../../services/ApiService/ApiService";
import { authActionCompleteAction, loginCompleteAction } from "../actions/users.action";
import { storageService } from "../../services/StorageService/StorageService";

function* loginSaga(data: any): any {

  const response = yield (apiService.loginUser(data.payload));
  console.log(response);
  if (response) {

    yield put(loginCompleteAction(response))
  }

}

function* CreateUserSaga(data: any): any {
  const { Email: email, Username: username, Password: password, Name: name } = data.payload;
  try {
    console.log(data.payload) ;
    
    const response = yield (apiService.createUser({ email, username, password, name }));

    if (response) {
      console.log(response)
      yield put(authActionCompleteAction(response));
    }
  }
  catch (error: any) {
    console.log(error);

  }

}

function* getCurrentUser(): any {
  console.log('---------------Get CurrentUserSaga RUn')
  const token = storageService.getLocalStorageValue('token');
  console.log(token);

  if (token) {
    const response = yield apiService.getCurrentUser(token);
    console.log(response);

    if (response) {
      yield put(authActionCompleteAction(response))
    }

  }

}

export default function* authsaga() {
  yield all([takeLatest(UserActionType.LOGIN, loginSaga),
  takeLatest(UserActionType.CREATE_USER, CreateUserSaga),
  takeLatest(UserActionType.GET_USER, getCurrentUser)])
}