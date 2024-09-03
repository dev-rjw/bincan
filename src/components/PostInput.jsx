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

    const engValidation = /^[A-Za-z0-9.]+$/g; // 영어랑 숫자만 포함하는 정규표현식
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

        const { data, error } = await supabase
            .from("posts")
            .insert([
                {
                    title: title,
                    nickname: user?.user.user_metadata.nickName,
                    img_url: imgUrl,
                    money: money,
                    context: context
                }
            ])
            .select();

        if (error) console.log(error);

        setPosts([...posts, ...data]);

        setTitle("");
        setMoney("");
        setContext("");
        setImgUrl("");
    };

    return (
        <StyledWindow>
            <StyledInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <StyledInput type="text" value={money} onChange={(e) => setMoney(e.target.value)} />
            <StyledTextArea value={context} onChange={(e) => setContext(e.target.value)} />
            <img src={imgUrl} width="30%" />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileInputChange(e.target.files)}
                ref={fileInputRef}
            ></input>
            <StyledButton onClick={insertDocument}>등록</StyledButton>
        </StyledWindow>
    );
};

export default PostInput;

const StyledWindow = styled.div`
    width: 100%;
    background-color: #676767;
    display: flex;
    flex-direction: column;
    place-items: center;
    text-align: center;
    border-radius: 10px;
`;

const StyledInput = styled.input`
    width: 40%;
    height: 30px;
    background-color: #f1d594;
`;

const StyledTextArea = styled.textarea`
    width: 40%;
    height: 60px;
    background-color: #f1d594;
`;

const StyledButton = styled.button`
    width: 15%;
    height: 35px;
    background-color: #edb432;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;
