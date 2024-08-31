import React, { useState } from "react";
import { supabase } from "../supabase";

const LogOut = () => {
    async function signOut() {
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

export default LogOut;
