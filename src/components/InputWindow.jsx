import React, { useState } from "react";
import styled from "styled-components";
import { supabase } from "../supabase";

const Window = styled.div`
    width: 100%;
    background-color: #676767;
    display: flex;
    flex-direction: column;
    place-items: center;
    text-align: center;
    border-radius: 10px;
`;

const Input = styled.input`
    width: 40%;
    height: 30px;
    background-color: #f1d594;
`;

const TextArea = styled.textarea`
    width: 40%;
    height: 60px;
    background-color: #f1d594;
`;

const Button = styled.button`
    width: 15%;
    height: 35px;
    background-color: #edb432;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;

const InputWindow = ({ posts, setPosts }) => {
    const [title, setTitle] = useState("");
    const [money, setMoney] = useState("");
    const [context, setContext] = useState("");

    const insertDocument = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("posts")
            .insert([{ title: title, nickname: "닉네임", img_url: "", money: money, context: context }])
            .select();

        if (error) console.log(error);

        setPosts([...posts, ...data]);
    };

    return (
        <Window>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input type="text" value={money} onChange={(e) => setMoney(e.target.value)} />
            <TextArea value={context} onChange={(e) => setContext(e.target.value)} />
            <img src="" />
            <Button onClick={insertDocument}>등록</Button>
        </Window>
    );
};

export default InputWindow;
