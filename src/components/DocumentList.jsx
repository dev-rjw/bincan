import React, { useContext, useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import styled from "styled-components";
import { supabase } from "../supabase";
import { PostsContext } from "../App";

const DocumentList = () => {
    const { posts, setPosts } = useContext(PostsContext);

    useEffect(() => {
        getDocument(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDocument = async () => {
        let { data, error } = await supabase.from("posts").select("*");
        if (error) console.log(error);

        setPosts([...data]);
    };

    return (
        <>
            <StyledCardDiv>
                {posts.map((post) => {
                    return <DocumentCard key={post.id} post={post} />;
                })}
            </StyledCardDiv>
        </>
    );
};

export default DocumentList;

const StyledCardDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;
