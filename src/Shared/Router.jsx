import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MainPage from "../pages/MainPage";
import Detail from "../pages/Detail";
import NavHeader from "../components/NavHeader";
import MyPage from "../pages/MyPage";
import DetailEdit from "../pages/DetailEdit";
import MyInfo from "../pages/MyInfo";
import { supabase } from "../supabase";
import Footer from "../components/footer";

// 로그아웃 상태
const AuthRoute = () => {
    return <Outlet />;
};
//로그인이 된상태
const PrivateRoute = () => {
    //isSign에 로그인 상태를 받아옴
    const [signIn, setSignIn] = useState(true);

    useEffect(() => {
        checkSignIn();
    }, []);

    //로그인 유효성 검사
    async function checkSignIn() {
        const session = await supabase.auth.getSession();
        const isSignIn = !!session.data.session;

        setSignIn(isSignIn);
    }

    // 검사
    if (!signIn) {
        alert("비정상적인 접근입니다. 로그인을 해주세요.");
        return <Navigate to={"/login"} />;
    }

    return <Outlet />;
};

const Router = () => {
    return (
        <BrowserRouter>
            <NavHeader />
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route element={<AuthRoute />}>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/detail" element={<Detail />}></Route>
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/mypage" element={<MyPage />}></Route>
                    <Route path="/myinfo" element={<MyInfo />}></Route>
                    <Route path="/detail-edit" element={<DetailEdit />}></Route>
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
