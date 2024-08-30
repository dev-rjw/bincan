import React, { useState } from "react";
import InputWindow from "../components/InputWindow";
import DocumentList from "../components/DocumentList";

function MainPage() {
    const [posts, setPosts] = useState([]);
    return (
        <>
            <InputWindow posts={posts} setPosts={setPosts} />
            <DocumentList posts={posts} setPosts={setPosts} />
        </>
    );
}

export default MainPage;
