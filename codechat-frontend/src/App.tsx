import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import { Toaster } from "react-hot-toast";
import EditorPage from "./views/Editor/EditorPage";
import { storageService } from "./services/StorageService/StorageService";
import { useDispatch } from "react-redux";
import { getUserAction } from "./store/actions/users.action";
import { useEffect } from "react";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (storageService.getLocalStorageValue('token')) {
            dispatch(getUserAction());
        }
    }, [])

    return (
        <>
            <Toaster position="top-center" ></Toaster>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/editor/:id' element={<EditorPage />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Router>
        </>



    )
}

export default App
