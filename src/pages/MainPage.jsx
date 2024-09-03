import React, { useEffect, useState } from "react";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import { supabase } from "../supabase";
import LogOut from "../components/LogOut";

function MainPage() {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
        return data;
    };

    return (
        <>
            <LogOut />
            {user.user !== null ? <PostInput /> : ""}
            <PostList />
        </>
    );
}

export default MainPage;
