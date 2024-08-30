import React from "react";
import styled from "styled-components";

const Card = styled.div`
    background-color: #d9d9d9;
    width: 200px;
    margin-top: 30px;
    cursor: pointer;
`;
const DocumentCard = ({ post }) => {
    return (
        <>
            <Card>
                <img src={post.img_url} width="100%"></img>
                <p>{post.title}</p>
                <p>{post.context}</p>
            </Card>
        </>
    );
};

export default DocumentCard;
