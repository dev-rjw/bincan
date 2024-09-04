import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { supabase } from "../supabase";
import { PostsContext } from "../App";

const PostInput = () => {
    const [title, setTitle] = useState("");
    const [money, setMoney] = useState("");
    const [context, setContext] = useState("");

    const [imgUrl, setImgUrl] = useState("");

    const { posts, setPosts, user, setUser } = useContext(PostsContext);

    const engValidation = /^[A-Za-z0-9._-]+$/g; // 영어랑 숫자만 포함하는 정규표현식
    const fileInputRef = useRef(null);

    useEffect(() => {
        checkPost();
        getUser();
    }, []);

    // user
    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    // post 세팅
    async function checkPost() {
        // 기본 이미지 "Group 66.png" 셋팅
        const { data } = supabase.storage.from("posts").getPublicUrl("Group_66.png");
        setImgUrl(data.publicUrl);
    }

    // post 사진 변경
    async function handleFileInputChange(files) {
        const [file] = files;

        // 파일이 없으면 리턴
        if (!file) {
            return;
        }

        // 파일명 유효성검사 => only eng & num
        if (!engValidation.test(file.name)) {
            alert("파일명이 잘못되었습니다. 영어 또는 숫자만 가능합니다.");
            return;
        }

        // 로컬스토리지에 파일명으로 저장
        // post 사진은 1개만 사용하므로 덮어쓰기(upsert:true)
        const { data } = await supabase.storage.from("posts").upload(file.name, file, { upsert: true });

        setImgUrl(supabase.storage.from("posts").getPublicUrl(file.name).data.publicUrl);
    }

    const insertDocument = async (e) => {
        e.preventDefault();

        // input validation
        if (title.trim() === "") {
            alert("제목을 입력해주세요.");
            return;
        }
        if (imgUrl.trim() === "") {
            alert("이미지를 추가해주세요.");
            return;
        }
        if (money.trim() === "") {
            alert("금액을 입력해주세요.");
            return;
        }
        if (context.trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        // input insert
        const { data, error } = await supabase
            .from("posts")
            .insert([
                {
                    title: title.trim(),
                    nickname: user?.user.user_metadata.nickName,
                    img_url: imgUrl.trim(),
                    money: money.trim(),
                    context: context.trim()
                }
            ])
            .select();

        if (error) console.log(error);

        alert("등록이 완료되었습니다.");
        setPosts([...posts, ...data]);

        setTitle("");
        setMoney("");
        setContext("");
        setImgUrl("");
        checkPost();
    };

    return (
        <StyledWindow>
            <LeftDiv>
                <StyledImg src={imgUrl} width="30%" />
                <StyledFile
                    id="styleLabel"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInputChange(e.target.files)}
                    ref={fileInputRef}
                ></StyledFile>
                <StyledLabel htmlFor="styleLabel">파일선택</StyledLabel>
            </LeftDiv>
            <RightDiv>
                <StyledInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
                <StyledInput
                    type="number"
                    value={money}
                    onChange={(e) => setMoney(e.target.value)}
                    placeholder="금액"
                />
                <StyledTextArea value={context} onChange={(e) => setContext(e.target.value)} placeholder="내용" />
                <ButtonDiv>
                    <StyledButton onClick={insertDocument}>등록</StyledButton>
                </ButtonDiv>
            </RightDiv>
        </StyledWindow>
    );
};

export default PostInput;

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

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row-reverse;
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
