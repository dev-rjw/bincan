import styled from "styled-components";

export const StyledBtn = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 10px;
    margin-top: 50px;
    width: 125px;
    height: 35px;

    font-size: 15px;
    color: #ffffff;

    border: none;
    border-radius: 3px;

    padding: 10px;
    background-color: #edb432;
    cursor: pointe;

    &:hover {
        background-color: #f6e6c2;
        color: #edb432;
    }
`;
