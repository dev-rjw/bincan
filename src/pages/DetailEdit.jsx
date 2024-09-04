import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";

const DetailEdit = () => {
    const [title, setTitle] = useState("");
    const [money, setMoney] = useState("");
    const [context, setContext] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const [post, setPost] = useState("");

    const { posts, setPosts, user, setUser } = useContext(PostsContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const postsId = searchParams.get("id");

    const onchangeImageUpload = (e) => {
        const { files } = e.target;
        const uploadFile = files[0];

        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => setImgUrl(reader.result);
    };

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    useEffect(() => {
        getUser();

        const filteredPost = posts?.filter((data) => {
            return data.id === Number(postsId);
        });

        if (filteredPost.length > 0) {
            const post = filteredPost[0];
            setTitle(post.title || "");
            setMoney(post.money || "");
            setContext(post.context || "");
            setImgUrl(post.img_url || "");
        }
    }, []);

    const getDocument = async () => {
        let { data, error } = await supabase.from("posts").select("*");
        if (error) console.log(error);

        setPosts([...data]);
    };

    const editPost = async (e) => {
        e.preventDefault();

        if (!title || !money || !context || !imgUrl) {
            alert("빈칸을 채워주세요~");
            return;
        }

        // 현재 사용자의 ID를 가져옴
        const userId = user.user.id;
        if (!userId) {
            console.error("유저 아이디가 없습니다");
            navigate("/signup");

            return;
        }

        const { data, error } = await supabase
            .from("posts")
            .update({ title, img_url: imgUrl, money, context })
            .eq("id", postsId)
            .eq("user_id", userId)
            .select();

        if (error) {
            console.log("게시물 업데이트 오류", error);
            return;
        } else {
            getDocument();
            navigate(`/detail?id=${postsId}`);
        }
    };

    return (
        <MainDiv>
            <StyledWindow>
                <LeftDiv>
                    <StyledImg src={imgUrl} width="30%" />
                    <StyledFile
                        id="styleLabel"
                        type="file"
                        accept="image/*"
                        onChange={onchangeImageUpload}
                    ></StyledFile>
                    <StyledLabel htmlFor="styleLabel">파일선택</StyledLabel>
                </LeftDiv>
                <RightDiv>
                    <StyledInput
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                    />
                    <StyledInput
                        type="number"
                        value={money}
                        onChange={(e) => setMoney(e.target.value)}
                        placeholder="금액"
                    />
                    <StyledTextArea value={context} onChange={(e) => setContext(e.target.value)} placeholder="내용" />
                    <StyledButtonDiv>
                        <StyledButton
                            onClick={() => {
                                navigate(`/detail?id=${postsId}`);
                            }}
                        >
                            취소
                        </StyledButton>
                        <StyledButton onClick={editPost}>수정완료</StyledButton>
                    </StyledButtonDiv>
                </RightDiv>
            </StyledWindow>
        </MainDiv>
    );
};

export default DetailEdit;

const MainDiv = styled.div`
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledWindow = styled.div`
    width: 800px;
    height: 350px;
    background-color: #edb432;
    display: flex;
    text-align: center;
    border-radius: 8px;
`;

const LeftDiv = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
`;

const RightDiv = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 10px;
`;

const StyledInput = styled.input`
    width: 90%;
    height: 45px;
    background-color: #f1d594;
    border-radius: 8px;
    border: none;
    padding: 15px;

    &:focus {
        background-color: #ffffff;
        outline: none;
    }
`;

const StyledTextArea = styled.textarea`
    width: 90%;
    height: 120px;
    background-color: #f1d594;
    border-radius: 8px;
    border: none;
    resize: none;
    padding: 15px;
    &:focus {
        background-color: #ffffff;
        outline: none;
    }
`;

const StyledButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledButton = styled.button`
    width: 150px;
    height: 35px;
    background-color: #edb432;
    color: white;
    border: 1px solid white;
    margin-right: 48px;
    margin-top: 10px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: white;
        color: #edb432;
    }
`;

const StyledImg = styled.img`
    background-color: white;
    width: 300px;
    height: 230px;
    margin: 30px 30px 20px 30px;
    border-radius: 8px;
`;

const StyledFile = styled.input`
    visibility: hidden;
`;

const StyledLabel = styled.label`
    display: flex;
    justify-content: space-around;

    padding: 10px;
    margin: auto;
    margin-top: -20px;
    margin-bottom: 20px;

    width: 125px;
    height: 35px;
    border-radius: 8px;
    /* border: 1px solid white; */
    background-color: #edb432;
    color: white;
    text-decoration: underline;
    cursor: pointer;
`;
