import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PostsContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import { supabase } from "../supabase";

function Detail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const postsId = searchParams.get("id");

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [thumbUp, setThumbUp] = useState(0);
    const [thumbDown, setThumbDown] = useState(0);

    const { user, setUser } = useContext(PostsContext);

    useEffect(() => {
        getPost();
        getUser();
        getComment();
        getThumbUp();
        getThumbDown();
    }, []);

    const getPost = async () => {
        let { data, error } = await supabase.from("posts").select("*").eq("id", postsId);
        if (error) console.log(error);
        setPost(data[0]);
    };

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    const getThumbUp = async () => {
        const { data, error } = await supabase.from("posts").select("thumb_up").eq("id", postsId);
        setThumbUp(data[0].thumb_up);
    };

    const getThumbDown = async () => {
        const { data, error } = await supabase.from("posts").select("thumb_down").eq("id", postsId);
        setThumbDown(data[0].thumb_down);
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const result = confirm("게시글을 삭제하시겠습니까?");
        if (result) {
            const { error } = await supabase.from("posts").delete().eq("id", postsId);
            navigate("/");
        } else {
            getPost();
            return;
        }
    };

    const getComment = async () => {
        let { data, error } = await supabase.from("comments").select("*").eq("post_id", postsId);
        if (error) console.log(error);

        setComments(data);
    };

    const updateThumbUp = async () => {
        setThumbUp(thumbUp + 1);
        const { data, error } = await supabase
            .from("posts")
            .update({ thumb_up: thumbUp + 1 })
            .eq("id", postsId)
            .select();

        if (error) {
            console.log("버튼 오류", error);
            return;
        }
    };

    const updateThumbDown = async () => {
        setThumbDown(thumbDown + 1);
        const { data, error } = await supabase
            .from("posts")
            .update({ thumb_down: thumbDown + 1 })
            .eq("id", postsId)
            .select();

        if (error) {
            console.log("버튼 오류", error);
            return;
        }
    };

    const { created_at, title, nickname, img_url, money, context } = post;
    const formatDate = created_at ? created_at.slice(0, 10) : "";

    return (
        <>
            <StDetailContainer>
                <StBtnContainer>
                    <StBtnWrapper>
                        {user?.user?.id === post.user_id ? (
                            <>
                                <StEditBtn
                                    onClick={() => {
                                        navigate(`/detail-edit?id=${postsId}`);
                                    }}
                                >
                                    수정하기
                                </StEditBtn>
                                <StDeleteBtn onClick={handleDelete}>삭제하기</StDeleteBtn>
                            </>
                        ) : (
                            <>{""}</>
                        )}
                    </StBtnWrapper>
                </StBtnContainer>
            </StDetailContainer>

            <StContentContainer>
                <StContentArea>
                    <StLeftArea>
                        <StyledImg src={img_url} alt={title} />
                    </StLeftArea>
                    <StRightArea>
                        <StyledRightTop>
                            <StyledNickname>{nickname}</StyledNickname>
                            <StyledDate>{formatDate}</StyledDate>
                        </StyledRightTop>
                        <StyledTitle>{title}</StyledTitle>
                        <StyledContext>{context}</StyledContext>
                        <StyledMoney>
                            <StyledHr style={{ border: "0.5px solid #666" }} />
                            {Number(money)?.toLocaleString()}원
                        </StyledMoney>
                    </StRightArea>
                </StContentArea>
            </StContentContainer>
            <StVoteBtnContainer>
                <StVoteBtnWrapper>
                    <StGoodBtn onClick={updateThumbUp}>😋 {thumbUp}</StGoodBtn>
                    <StBadBtn onClick={updateThumbDown}>🤬 {thumbDown}</StBadBtn>
                </StVoteBtnWrapper>
            </StVoteBtnContainer>

            <StyledCommentContainer>
                <StyledCommentWrapper>
                    <CommentList comments={comments} setComments={setComments} />
                    <CommentInput comments={comments} setComments={setComments} />
                </StyledCommentWrapper>
            </StyledCommentContainer>
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
    margin-top: 80px;
`;
const StBtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
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
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.2);
`;

const StLeftArea = styled.div`
    /* background-color: green; */
    width: 620px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const StRightArea = styled.div`
    width: 50%;
    margin: 40px;
    position: relative;
`;

const StyledRightTop = styled.div`
    display: flex;
    top: 0px;
    margin-bottom: 50px;
`;

const StyledNickname = styled.div`
    margin-right: 20px;
    font-weight: 600;
`;
const StyledDate = styled.div``;
const StyledTitle = styled.div`
    font-size: 40px;
    margin-bottom: 20px;
    font-weight: 600;
`;
const StyledContext = styled.div`
    font-size: 20px;
    margin-bottom: 20px;
    height: 100px;
    overflow: hidden;
`;
const StyledMoney = styled.div`
    font-size: 40px;
    font-weight: 600;
    position: absolute;
    bottom: 0;
    left: 0;
`;

const StVoteBtnContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const StVoteBtnWrapper = styled.div`
    display: flex;
    gap: 50px;
    margin: 50px 0 60px 0;
`;

const StGoodBtn = styled.button`
    width: 300px;
    height: 80px;
    border: none;
    border-radius: 12px;
    background-color: #edb432;
    font-size: 40px;
    cursor: pointer;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #dca732;
        transform: scale(1.02);
    }
`;

const StBadBtn = styled.button`
    width: 300px;
    height: 80px;
    border: none;
    border-radius: 12px;
    background-color: #edb432;
    font-size: 40px;
    cursor: pointer;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #dca732;
        transform: scale(1.02);
    }
`;

const StyledCommentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const StyledCommentWrapper = styled.div`
    width: 1280px;
`;

const StyledHr = styled.hr`
    width: 608px;
`;
