import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import styled from "styled-components";
import { StyledBtn } from "../components/StyledComponents/StyledButton";
import { Input } from "../components/StyledComponents/StyledInput";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getUserData();
    }, []);

    const logIn = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert("아이디 또는 비밀번호를 확인해주세요.");
        } else {
            alert("로그인 되었습니다.");
            navigate("/");
        }
    };

    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
        return data;
    };

    return (
        <div>
            <form onSubmit={logIn}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                <StyledBtn type="submit">로그인</StyledBtn>
                <StyledBtn type="button" onClick={() => navigate("/signup")}>
                    회원가입
                </StyledBtn>
            </form>
        </div>
    );
}

export default Login;
