import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

//supabass 연결
const SUPABASS_URL = "https://ltmlsvowetkigjbwwqwy.supabase.co";
const SUPABASS_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0bWxzdm93ZXRraWdqYnd3cXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5MjcyNzAsImV4cCI6MjA0MDUwMzI3MH0.1G0_d68W7plz2leDZpUWGroiUqaaddlWcBn-kwU3Am0";
const supabase = createClient(SUPABASS_URL, SUPABASS_KEY);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");

    useEffect(() => {
        getUserData();
    }, []);

    const signUp = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    nickName: nickName,
                    avatar_url: null
                }
            }
        });
    };

    const logIn = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        getUserData();
    };

    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={logIn}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button">확인</button>
            </form>
        </div>
    );
}

export default Login;
