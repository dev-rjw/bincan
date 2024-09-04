import React, { useContext, useEffect, useState } from "react";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import styled from "styled-components";

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
        <MainDiv>
            {user?.user !== null ? <PostInput /> : ""}
            <PostList />
        </MainDiv>
    );
}

export default MainPage;

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
`;
