import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PostsContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import { supabase } from "../supabase";

function Detail() {
    const [searchParams] = useSearchParams();
    const postsId = searchParams.get("id");

    const [selectedPost, setSelectedPost] = useState({});
    const [comments, setComments] = useState([]);
    const { user } = useContext(PostsContext);
    const navigate = useNavigate();
    useEffect(() => {
        const getPost = async () => {
            let { data, error } = await supabase.from("posts").select("*").eq("id", postsId);
            if (error) {
                console.log(error);
            }
            console.log(data);
            setSelectedPost(data[0]);
        };
        getPost();
    }, []);

    const { created_at, title, nickname, img_url, money, context } = selectedPost;

    return (
        <>
            <StDetailContainer>
                <StBtnContainer>
                    <StBtnWrapper>
                        <StEditBtn
                            onClick={() => {
                                navigate(`/detail-edit?id=${postsId}`);
                            }}
                        >
                            수정하기
                        </StEditBtn>

                        <StDeleteBtn>삭제하기</StDeleteBtn>
                    </StBtnWrapper>
                </StBtnContainer>
            </StDetailContainer>

            <StContentContainer>
                <StContentArea>
                    <StRightArea>
                        <img src={img_url} alt={title} />
                    </StRightArea>
                    <StLeftArea>
                        <div>{nickname}</div>
                        <div>{created_at}</div>
                        <div>{title}</div>
                        <div>{context}</div>
                        <div>{money}</div>
                    </StLeftArea>
                </StContentArea>
            </StContentContainer>
            <StVoteBtnContainer>
                <StVoteBtnWrapper>
                    <StGoodBtn>인정</StGoodBtn>
                    <StBadBtn>장난?</StBadBtn>
                </StVoteBtnWrapper>
            </StVoteBtnContainer>

            <CommentList comments={comments} setComments={setComments} />
            <CommentInput comments={comments} setComments={setComments} />
        </>
    );
}

export default Detail;

const StDetailContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const StBtnContainer = styled.div`
    width: 1280px;
    height: 20px;
    /* background-color: purple; */
    margin-top: 80px;
`;
const StBtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const StEditBtn = styled.div``;
const StDeleteBtn = styled.div`
    margin-left: 20px;
`;

const StContentContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const StContentArea = styled.div`
    width: 1280px;
    height: 400px;
    /* background-color: blue; */
    display: flex;
`;

const StRightArea = styled.div`
    flex: 1;
    background-color: blue;
`;
const StLeftArea = styled.div`
    background-color: green;
    flex: 1;
`;

const StVoteBtnContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const StVoteBtnWrapper = styled.div`
    display: flex;
    gap: 50px;
    margin: 30px 0 60px 0;
`;
const StGoodBtn = styled.button`
    width: 300px;
    height: 80px;
    background-color: red;
`;
const StBadBtn = styled.button`
    width: 300px;
    height: 80px;
    background-color: red;
`;
