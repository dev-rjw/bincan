import React, { useContext, useState } from "react";
import styled from "styled-components";
import { supabase } from "../supabase";
import { PostsContext } from "../App";

const PostInput = () => {
    const [title, setTitle] = useState("");
    const [money, setMoney] = useState("");
    const [context, setContext] = useState("");

    const [imgUrl, setImgUrl] = useState("");

    const { posts, setPosts } = useContext(PostsContext);

    const onchangeImageUpload = (e) => {
        const { files } = e.target;
        const uploadFile = files[0];

        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => setImgUrl(reader.result);
    };

    const insertDocument = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("posts")
            .insert([{ title: title, nickname: "닉네임", img_url: imgUrl, money: money, context: context }])
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
            <input type="file" accept="image/*" onChange={onchangeImageUpload}></input>
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
