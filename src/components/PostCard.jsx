import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostCard = ({ post }) => {
    const navigate = useNavigate();
    return (
        <>
            <StyledCard
                onClick={() => {
                    navigate(`/detail?id=${post.id}`);
                }}
            >
                <img src={post.img_url} width="100%"></img>
                <p>{post.title}</p>
                <p>{post.context}</p>
            </StyledCard>
        </>
    );
};

export default PostCard;

const StyledCard = styled.div`
    background-color: #d9d9d9;
    width: 200px;
    margin-top: 30px;
    cursor: pointer;
`;
