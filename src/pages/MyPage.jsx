import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import { supabase } from "../supabase";

function MyPage() {
    const navigate = useNavigate();
    const { posts, user, setUser } = useContext(PostsContext);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");
    // const userProfileUrl = userData.user.user_metadata.profileUrl;

    const filterdPosts = posts.filter((post) => post.user_id === userId);
    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
        console.log(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Dashboard>
                <img src={user?.user.user_metadata.profileUrl} alt="" width="50%" />
                <h2>닉네임</h2>
                <p>{user?.user.user_metadata.nickName}</p>
                <h2>이메일</h2>
                <p>{user?.user.email}</p>
                <h2>자기소개</h2>
                <p>{user?.user.user_metadata.intro ? user?.user.user_metadata.intro : "자기소개를 등록해주세요"}</p>
                <StyledButton onClick={() => navigate("/MyInfo")}>개인정보수정</StyledButton>
            </Dashboard>
            <PostList id={userId} />
        </>
    );
}

export default MyPage;

const Dashboard = styled.div``;

const StyledButton = styled.button`
    width: 15%;
    height: 35px;
    background-color: #edb432;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;
