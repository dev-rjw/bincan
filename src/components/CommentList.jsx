import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { supabase } from "../supabase";
import { useSearchParams } from "react-router-dom";

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [searchParams] = useSearchParams();
    const postsId = searchParams.get("id");

    useEffect(() => {
        getComment();
    }, [comments]);

    const getComment = async () => {
        let { data, error } = await supabase.from("comments").select("*").eq("post_id", postsId);
        if (error) console.log(error);

        setComments(data);
        // console.log(data);
    };
    return (
        <>
            {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
            })}
        </>
    );
};

export default CommentList;
