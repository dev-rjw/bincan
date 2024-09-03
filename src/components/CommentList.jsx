import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { supabase } from "../supabase";
import { useSearchParams } from "react-router-dom";

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [searchParams] = useSearchParams();
    const postsId = searchParams.get("id");

    // 어떤식으로 바로 보여줄지... useEffect
    const getComment = async () => {
        let { data, error } = await supabase.from("comments").select("*").eq("post_id", postsId);
        if (error) console.log(error);

        setComments(data);
        // setComments((prev) => [...prev, ...data]);
    };
    getComment();
    return (
        <>
            {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
            })}
        </>
    );
};

export default CommentList;
