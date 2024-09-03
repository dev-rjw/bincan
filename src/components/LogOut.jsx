import React, { useContext, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";

const LogOut = () => {
    const { user, setUser } = useContext(PostsContext);
    async function signOut() {
        await supabase.auth.signOut();
        setUser(null);
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
