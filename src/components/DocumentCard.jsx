import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
    background-color: #d9d9d9;
    width: 200px;
    margin-top: 30px;
    cursor: pointer;
`;
const DocumentCard = ({ post }) => {
    const navigate = useNavigate();
    return (
        <>
            <Card
                onClick={() => {
                    navigate(`/detail?id=${post.id}`);
                    console.log(post.id);
                }}
            >
                <img src={post.img_url} width="100%"></img>
                <p>{post.title}</p>
                <p>{post.context}</p>
            </Card>
        </>
    );
};

export default DocumentCard;
