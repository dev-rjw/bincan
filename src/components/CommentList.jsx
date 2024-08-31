import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { supabase } from "../supabase";

const CommentList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComment();
    }, []);

    const getComment = async () => {
        let { data, error } = await supabase.from("comments").select("*");
        if (error) console.log(error);

        setComments(data);
        console.log(data);
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
