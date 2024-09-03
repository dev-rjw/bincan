import React, { useContext } from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import { PostsContext } from "../App";

const PostList = ({ id }) => {
    const { posts, user } = useContext(PostsContext);
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
