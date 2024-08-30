import React from "react";
import styled from "styled-components";

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

const InputWindow = () => {
    return (
        <Window>
            <Input type="text" />
            <Input type="text" />
            <TextArea />
            <img src="" />
            <Button>등록</Button>
        </Window>
    );
};

export default InputWindow;
