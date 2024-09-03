import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { supabase } from "../supabase";
import { useSearchParams } from "react-router-dom";

const CommentList = ({ comments, setComments }) => {
    const handleEdit = (updatedComment) => {
        // 수정된 댓글로 상태 업데이트

        const updatedComments = comments.map((comment) =>
            comment.id === updatedComment.id ? updatedComment : comment
        );
        setComments(updatedComments);
    };

    const handleDelete = (deletedCommentId) => {
        // 삭제된 댓글을 제외한 새로운 댓글 배열 생성
        const updatedComments = comments.filter((comment) => comment.id !== deletedCommentId);
        setComments(updatedComments);
    };
    return (
        <>
            {comments
                .sort((a, b) => {
                    return new Date(a.created_at) - new Date(b.created_at);
                })
                .map((comment) => (
                    <Comment key={comment.id} comment={comment} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
        </>
    );
};

export default CommentList;
