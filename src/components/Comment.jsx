import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { PostsContext } from "../App";
import { supabase } from "../supabase";

const Comment = ({ comment, onDelete, onEdit }) => {
    const { user, setUser } = useContext(PostsContext);

    useEffect(() => {
        getUser();
    }, []);

    // user
    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    // 수정
    const handleEdit = async (e) => {
        e.preventDefault();
        const newComment = window.prompt("변경하실 내용을 적어주세요", comment.comment);

        const updatedComment = {
            id: comment.id,
            comment: newComment,
            user_id: comment.user_id,
            created_at: comment.created_at,
            nickname: comment.nickname
        };

        const { data, error } = await supabase
            .from("comments")
            .update({ comment: updatedComment.comment, nickname: user?.user.user_metadata.nickName })
            .eq("id", updatedComment.id)
            .eq("user_id", updatedComment.user_id)
            .select();

        // 취소
        if (newComment === null) {
            alert("댓글 수정이 취소되었습니다.");
            return;
        }

        // 빈 값 입력
        if (newComment.trim() === "") {
            alert("댓글 내용을 입력해야 합니다.");
            return;
        }
        if (error) {
            console.error("댓글 수정 오류:", error);
            alert("댓글 수정 중 오류가 발생했습니다.");
            return;
        }
        onEdit(updatedComment);
        // 수정 성공 후 사용자에게 알림
        alert("댓글이 수정되었습니다.");
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const result = confirm("댓글을 삭제하시겠습니까?");
        if (result) {
            const { error } = await supabase.from("comments").delete().eq("id", comment.id);
            console.log(error);
        } else {
            return;
        }
        onDelete(comment.id);
    };

    return (
        <>
            <StyledCommentWrapper>
                <StyledCommentNickname>{comment.nickname} </StyledCommentNickname>
                <StyledCommentComment>{comment.comment} </StyledCommentComment>
                <StyledCommentTime>{comment.created_at.slice(0, 10)}</StyledCommentTime>
                {user?.user?.id === comment.user_id ? (
                    <>
                        <StyledCommentBtnContainer>
                            <StyledCommentBtnWrapper>
                                <StyledCommentEditBtn onClick={handleEdit}>[수정]</StyledCommentEditBtn>
                                <StyledCommnetDeleteBtn onClick={handleDelete}>[X]</StyledCommnetDeleteBtn>
                            </StyledCommentBtnWrapper>
                        </StyledCommentBtnContainer>
                    </>
                ) : (
                    <></>
                )}
            </StyledCommentWrapper>
        </>
    );
};

export default Comment;

const StyledcommentContainer = styled.div``;

const StyledCommentWrapper = styled.div`
    width: 100%x;
    height: 40px;
    border-radius: 8px;
    margin-top: 10px;
    background-color: #f6e6c2;
    display: flex;
    align-items: center;
`;

const StyledCommentNickname = styled.div`
    margin-left: 50px;
    width: 120px;
`;

const StyledCommentComment = styled.div`
    margin-left: 20px;
    width: 850px;
`;
const StyledCommentTime = styled.div`
    width: 120px;
`;

const StyledCommentBtnContainer = styled.div`
    justify-content: flex-end;
`;
const StyledCommentBtnWrapper = styled.div`
    display: flex;
    gap: 5px;
`;
const StyledCommentEditBtn = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;
const StyledCommnetDeleteBtn = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;
