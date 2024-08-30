import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Detail from "../pages/Detail";
import NavHeader from "../components/NavHeader";

const AuthRoute = () => {
    return <Outlet />;
};

const PrivateRoute = () => {
    return <Outlet />;
};

const Router = () => {
    return (
        <BrowserRouter>
            <NavHeader />
            <Routes>
                <Route path="/main" element={<Main />}></Route>
                <Route element={<AuthRoute />}>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/mypage/:id" element={<MyPage />}></Route>
                    <Route path="/detail/:id/:postid " element={<Detail />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
