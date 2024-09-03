import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import styled from "styled-components";
import { StyledBtn } from "../components/StyledComponents/StyledButton";
import { Input } from "../components/StyledComponents/StyledInput";
import { StyledLogo } from "../components/StyledComponents/StyledLogo";

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
            alert("로그인을 성공하였습니다. 메인페이지로 이동합니다.");
            navigate("/");
        }
    };

    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
        return data;
    };

    return (
        <div>
            <Form onSubmit={logIn}>
                <StyledLogo
                    alt="X"
                    src="https://ltmlsvowetkigjbwwqwy.supabase.co/storage/v1/object/public/UserProfile/bbin.svg
                    "
                ></StyledLogo>
                <InputLogin>
                    <Font>이메일</Font>
                    <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Font>비밀번호</Font>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </InputLogin>
                <Div>
                    <StyledBtn type="submit">로그인</StyledBtn>
                    <StyledBtn type="button" onClick={() => navigate("/signup")}>
                        회원가입
                    </StyledBtn>
                </Div>
            </Form>
        </div>
    );
}

export default Login;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Font = styled.p`
    margin-left: 12px;
    margin-top: 2%;
    margin-bottom: 13px;
`;
