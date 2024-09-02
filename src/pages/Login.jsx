import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

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
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">로그인</button>
                <button type="button" onClick={() => navigate("/signup")}>
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Login;
