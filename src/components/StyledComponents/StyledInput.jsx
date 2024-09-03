import styled from "styled-components";

export const Input = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 10px;
    margin-top: 7%;
    width: 67%;
    height: 50px;

    font-size: 23px;
    color: #1f1f1f;

    border: none;
    border-radius: 3px;

    padding: 10px;
    background-color: #f6e6c2;
    cursor: pointe;

    &:focus {
        background-color: #f1d594;
    }
`;
