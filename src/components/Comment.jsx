import React from "react";
import styled from "styled-components";

const Comment = ({ comment }) => {
    return (
        <>
            <StCommentWrapper>
                <StCommentContext>{comment.context} </StCommentContext>
                <StCommentTime>{comment.created_at}</StCommentTime>
            </StCommentWrapper>
        </>
    );
};

export default Comment;

const commentContainer = styled.div``;

const StCommentWrapper = styled.div`
    width: 100%x;
    height: 30px;
    margin-top: 10px;
    background-color: red;
    display: flex;
`;

const StCommentContext = styled.div``;
const StCommentTime = styled.div``;
