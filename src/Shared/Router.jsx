import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Detail from "../pages/Detail";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/SignUp" element={<SignUp />}></Route>
                <Route path="/Main" element={<Main />}></Route>
                <Route path="/MyPage/id:" element={<MyPage />}></Route>
                <Route path="/Detail/id: " element={<Detail />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
