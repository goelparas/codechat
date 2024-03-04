import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./reducer/root";
import createSagaMiddleware from 'redux-saga';
import rootsaga from "./sagas/root.saga";


const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
    reducer:RootReducer,
    middleware:(getdefaultMiddleware)=>getdefaultMiddleware({serializableCheck:false}).concat(sagaMiddleWare)
})

sagaMiddleWare.run(rootsaga)