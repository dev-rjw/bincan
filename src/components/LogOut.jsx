import React, { useState } from "react";
import { supabase } from "../supabase";

const LogOut = () => {
    const [signIn, setSignIn] = useState(false);

    // 로그인 유효성 검사
    async function checkSignIn() {
        const session = await supabase.auth.getSession();
        const isSignIn = !!session.data.session;

        setSignIn(isSignIn);
    }

    async function signOut() {
        await supabase.auth.signOut();
        checkSignIn();
    }

    return (
        <div>
            <SignInBtn text="로그아웃" onClick={signOut} />
        </div>
    );
};

function SignInBtn({ text, onClick }) {
    return (
        <button type="button" onClick={onClick}>
            {text}
        </button>
    );
}

export default LogOut;
