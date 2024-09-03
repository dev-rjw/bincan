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
            <StInput
                type="text"
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            />
            <StButton onClick={addComment}>등록</StButton>
        </div>
    );
};

export default CommentInput;

const StInput = styled.input``;
const StButton = styled.button``;
