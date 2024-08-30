import React from "react";
import styled from "styled-components";

const Card = styled.div`
    background-color: #aaaaaa;
    width: 200px;
    margin: 10px;
`;
const DocumentCard = ({ post }) => {
    return (
        <>
            <Card>
                <img src={post.img_url} width="100%"></img>
                <p>{post.title}</p>
                <p>{post.content}</p>
            </Card>
        </>
    );
};

export default DocumentCard;
