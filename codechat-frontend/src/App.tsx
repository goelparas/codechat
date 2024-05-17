import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import { Toaster } from "react-hot-toast";
import EditorPage from "./views/Editor/EditorPage";
import { storageService } from "./services/StorageService/StorageService";
import { useDispatch } from "react-redux";
import { getUserAction } from "./store/actions/users.action";
import { useEffect } from "react";
import GradientBackground from "./components/Editor/GradientBackground";
import Lottie from "lottie-react";
import a  from '../src/animations.json'
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
            <GradientBackground/>
            <Lottie animationData={a}  style={{
                position:"fixed",
                top:"0px",
                left:"0px",
                right:0,
                zIndex:0,
            }}/>
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
