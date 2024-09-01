import React, { useContext, useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import styled from "styled-components";
import { supabase } from "../supabase";
import { PostsContext } from "../App";

const DocumentList = ({ id }) => {
    const { posts, user } = useContext(PostsContext);

    return (
        <>
            <StyledCardDiv>
                {posts
                    .sort((a, b) => {
                        if (a.created_at < b.created_at) return 1;
                        if (a.created_at > b.created_at) return -1;
                        return 0;
                    })
                    .map((post) => <DocumentCard key={post.id} post={post} />)
                    .filter((post) => (id === undefined ? post : post.id === id))}
            </StyledCardDiv>
        </>
    );
};

export default DocumentList;

const StyledCardDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;
