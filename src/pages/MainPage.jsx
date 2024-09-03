import React, { useContext, useEffect, useState } from "react";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import { supabase } from "../supabase";
import { PostsContext } from "../App";

function MainPage() {
    const { posts, setPosts, user, setUser } = useContext(PostsContext);

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    const getDocument = async () => {
        let { data, error } = await supabase.from("posts").select("*");
        if (error) console.log(error);

        setPosts([...data]);
    };

    useEffect(() => {
        getUser();
        getDocument();
    }, []);

    return (
        <>
            {user !== null ? <PostInput /> : ""}
            <PostList />
        </>
    );
}

export default MainPage;
