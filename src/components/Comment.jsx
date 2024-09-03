import React, { useContext } from "react";
import styled from "styled-components";
import { PostsContext } from "../App";
import { supabase } from "../supabase";
import { useNavigate, useSearchParams } from "react-router-dom";

const Comment = ({ comment, onDelete, onEdit }) => {
    // const navigate = useNavigate();
    const { user } = useContext(PostsContext);
    // const [searchParams] = useSearchParams();
    // const postsId = searchParams.get("id");
    // console.log(comment.user_id === user.user.id);

    // 수정
    const handleEdit = async (e) => {
        e.preventDefault();
        const newComment = window.prompt("변경하실 내용을 적어주세요", comment.comment);

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

        // 시작은 기존 댓글의 데이터들
        const updatedComment = {
            id: comment.id,
            comment: newComment,
            user_id: comment.user_id,
            created_at: comment.created_at
        };

        const { data, error } = await supabase
            .from("comments")
            .update({ comment: updatedComment.comment })
            .eq("id", updatedComment.id) // 댓글의 id로 업데이트
            .eq("user_id", updatedComment.user_id) // 현재 사용자의 댓글만 업데이트
            .select();
        // console.log(user.user.id);

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
            // console.log(comment);
        } else {
            return;
        }
        onDelete(comment.id);
    };

    return (
        <>
            <StCommentWrapper>
                <StCommentContext>{comment.user_id} </StCommentContext>
                <StCommentContext>{comment.comment} </StCommentContext>
                <StCommentTime>{comment.created_at.slice(0, 10)}</StCommentTime>
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

const StyledCommentBtnContainer = styled.div`
    justify-content: flex-end;
`;
const StyledCommentBtnWrapper = styled.div`
    display: flex;
    gap: 10px; /* 버튼들 사이에 간격 추가 */
`;
const StyledCommentEditBtn = styled.button``;
const StyledCommnetDeleteBtn = styled.button``;
