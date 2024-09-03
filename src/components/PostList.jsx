import React, { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import { PostsContext } from "../App";
import { supabase } from "../supabase";

const PostList = ({ id }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getDocument();
    }, []);

    const getDocument = async () => {
        let { data, error } = await supabase.from("posts").select("*");
        if (error) console.log(error);

        setPosts([...data]);
    };

    return (
        <>
            <StyledCardDiv>
                {posts
                    .sort((a, b) => {
                        if (a.created_at < b.created_at) return 1;
                        if (a.created_at > b.created_at) return -1;
                        return 0;
                    })
                    .filter((post) => (id === undefined ? post : post.user_id === id))
                    .map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
            </StyledCardDiv>
        </>
    );
};

export default PostList;

const StyledCardDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;
