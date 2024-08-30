import React, { useContext, useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import styled from "styled-components";
import { supabase } from "../supabase";
import { PostsContext } from "../App";

const CardDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const DocumentList = () => {
    const { posts, setPosts } = useContext(PostsContext);

    useEffect(() => {
        getDocument(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDocument = async () => {
        let { data, error } = await supabase.from("posts").select("*");
        if (error) console.log(error);

        setPosts([...posts, ...data]);
    };

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
