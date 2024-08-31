import React, { useState } from "react";
import { supabase } from "../supabase";
import styled from "styled-components";

const CommentInput = ({ comments, setComments }) => {
    const [context, setContext] = useState("");

    const addComment = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("comments")
            .insert([{ context: context }])
            .select();

        if (error) console.log(error);

        setComments([...comments, ...data]);
        setContext("");
        console.log(data);
    };

    return (
        <div>
            <StInput
                type="text"
                value={context}
                onChange={(e) => {
                    setContext(e.target.value);
                }}
            />
            <StButton onClick={addComment}>등록</StButton>
        </div>
    );
};

export default CommentInput;

const StInput = styled.input``;
const StButton = styled.button``;
