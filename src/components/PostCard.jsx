import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostsContext } from "../App";

const PostCard = ({ post }) => {
    const navigate = useNavigate();
    const formatDate = post.created_at ? post.created_at.slice(0, 10) : "";
    return (
        <>
            <StyledCard
                onClick={() => {
                    navigate(`/detail?id=${post.id}`);
                }}
            >
                <StyledImgContainer>
                    <StyledImg src={post.img_url} width="100%" />
                </StyledImgContainer>

                <StyledCardTop>
                    <StyledNickname>{post.nickname}</StyledNickname>
                    <StyledDate>{formatDate}</StyledDate>
                </StyledCardTop>

                <StyledTitle>{post.title.length > 28 ? post.title.substr(0, 28) + " ..." : post.title}</StyledTitle>

                <StyledMoney>
                    <strong>₩{Number(post.money)?.toLocaleString()}</strong>
                </StyledMoney>
            </StyledCard>
        </>
    );
};

export default PostCard;

const StyledCard = styled.div`
    position: relative;

    background-color: #f6e6c2;
    width: 230px;
    height: 400px;
    margin-top: 30px;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`;

const StyledImgContainer = styled.div`
    width: 100%;
    height: 240px;
    overflow: hidden;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
    background-color: white;
`;

const StyledCardTop = styled.div`
    display: flex;
    color: #777;
`;

const StyledNickname = styled.p`
    margin-left: 15px;
`;

const StyledDate = styled.p`
    margin-left: auto;
    margin-right: 15px;
`;

const StyledTitle = styled.p`
    font-size: 16px;
    margin: 10px;
`;

const StyledMoney = styled.p`
    margin-left: 15px;
    font-size: 20px;
    position: absolute;
    bottom: 0;
`;
