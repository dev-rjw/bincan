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
                <StyledImg src={post.img_url} width="100%"></StyledImg>
                <StyledP>{post.title}</StyledP>
                <StyledP>{post.context}</StyledP>
            </StyledCard>
        </>
    );
};

export default PostCard;

const StyledCard = styled.div`
    background-color: #f6e6c2;
    width: 200px;
    height: 300px;
    margin-top: 30px;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`;

const StyledImg = styled.img`
    height: 60%;
    border-radius: 10px 10px 0 0;
    background-color: white;
`;

const StyledP = styled.p`
    margin: 10px;
`;
