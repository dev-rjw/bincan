import React, { useContext, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = () => {
    const navigator = useNavigate();
    const { user, setUser } = useContext(PostsContext);

    async function signOut() {
        setUser({ user: null });
        await supabase.auth.signOut();
        alert("로그아웃 되었습니다. 메인페이지로 이동합니다.");
        navigator("/");
    }

    return <StNavMenu onClick={signOut}>로그아웃</StNavMenu>;
};

export default Logout;

const StNavMenu = styled.div`
    margin-left: 15px;
`;
