import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

export const Input = styled.input`
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    display: ${(props) => props.display || Flex};

    margin: 10px;
    margin-top: 10px;
    margin-bottom: 18px;
    width: 500px;
    min-height: 50px;

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

export function StyledInput({ children, display }) {
    return <Input display={display}>{children}</Input>;
}
