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
<<<<<<< HEAD
            <LogOut />
            {user.user !== null ? <PostInput /> : ""}
=======
            {userData.user !== null ? <PostInput /> : ""}
>>>>>>> cce299eb15cd90c8bfbbfc7e747f7977c385aff5
            <PostList />
        </>
    );
}

export default MainPage;
