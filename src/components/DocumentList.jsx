import React, { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import styled from "styled-components";

const CardDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const DocumentList = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            img_url: "src/assets/bincan.png",
            title: "1234",
            content: "1234"
        },
        {
            id: 2,
            img_url: "src/assets/bincan.png",
            title: "2222",
            content: "2222"
        }
    ]);

    useEffect(() => {}, []);

    return (
        <>
            <CardDiv>
                {posts.map((post) => {
                    return <DocumentCard key={post.id} post={post} />;
                })}
            </CardDiv>
        </>
    );
};

export default DocumentList;
