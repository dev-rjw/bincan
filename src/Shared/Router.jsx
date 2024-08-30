import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Detail from "../pages/Detail";
import LogIn from "../pages/Login";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<LogIn />}></Route>
                <Route path="/main" element={<Main />}></Route>
                <Route path="/mypage/:id" element={<MyPage />}></Route>
                <Route path="/detail/:id/:postid " element={<Detail />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
