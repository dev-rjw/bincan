import React, { useEffect, useState } from "react";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import { supabase } from "../supabase";
import LogOut from "../components/LogOut";
import MyInfo from "../pages/MyInfo";

function MainPage() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
        setUserData(data);
        return data;
    };

    return (
        <>
            {userData.user !== null ? <PostInput /> : ""}
            <PostList />
        </>
    );
}

export default MainPage;
