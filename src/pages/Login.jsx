import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

///supabass 연결
const SUPABASS_URL = "https://ltmlsvowetkigjbwwqwy.supabase.co";
const SUPABASS_KEY = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(SUPABASS_URL, SUPABASS_KEY);

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, setSignIn] = useState(false);

    useEffect(() => {
        getUserData();
        // checkSignIn();
    }, []);

    const logIn = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        console.log(signIn);

        // getUserData();
    };

    // 로그인 유효성 검사
    async function checkSignIn() {
        const session = await supabase.auth.getSession();
        const isSignIn = !!session.data.session;

        setSignIn(isSignIn);

        isSignIn ? navigate("/main") : alert("아이디 또는 비밀번호를 확인해주세요");
    }

    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
    };

    return (
        <div>
            <form onSubmit={logIn}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">확인</button>
            </form>
        </div>
    );
}

export default Login;
