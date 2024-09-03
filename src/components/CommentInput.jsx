import React, { useContext, useState } from "react";
import { supabase } from "../supabase";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { PostsContext } from "../App";

const CommentInput = ({ comments, setComments }) => {
    const { user } = useContext(PostsContext);
    const [comment, setComment] = useState("");
    const [searchParams] = useSearchParams();
    const postsId = searchParams.get("id");

    const addComment = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("comments")
            .insert([{ comment: comment, post_id: postsId, nickname: user?.user.user_metadata.nickName }])
            .select();

        if (error) console.log(error);

        setComments([...comments, ...data]);
        setComment("");
    };

    return (
        <div>
            <StyledCommentInputContainer>
                <StyledCommentInputWrapper>
                    <StyledCommentUser>{user?.user?.user_metadata.nickName}</StyledCommentUser>
                    <StyledInput
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                    <StyledButton onClick={addComment}>등록</StyledButton>
                </StyledCommentInputWrapper>
            </StyledCommentInputContainer>
        </div>
    );
};

export default CommentInput;

const StyledCommentInputContainer = styled.div`
    width: 1280px;
    margin-top: 40px;
    position: relative;
`;

const StyledCommentInputWrapper = styled.div`
    width: 100%;
    height: 100px;
    margin-right: 20px;
    border-radius: 8px;
    border: 2px solid #edb432;
`;

const StyledInput = styled.input`
    width: 90%;
    height: 30px;
    margin-left: 20px;
    border: none;
`;
const StyledButton = styled.button`
    width: 80px;
    height: 40px;
    margin-left: 20px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    border: none;
    border-radius: 8px;
    color: white;
    background-color: #edb432;
`;

const StyledCommentUser = styled.div`
    margin: 15px 20px;
    width: 200px;
`;
