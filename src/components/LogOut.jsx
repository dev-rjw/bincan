import React, { useContext, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";

const Logout = () => {
    const { user, setUser } = useContext(PostsContext);

    async function signOut() {
        setUser(null);
        await supabase.auth.signOut();
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

export default Logout;
