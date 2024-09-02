import styled from "styled-components";
import MyInfo from "./MyInfo";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { supabase } from "../supabase";

const Dashboard = styled.div`
    background-color: greenyellow;
`;

function MyPage() {
    const navigate = useNavigate();

    const { posts, user, setUser } = useContext(PostsContext);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");

    const filterdPosts = posts.filter((post) => post.user_id === userId);
    console.log(user);

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    // get user >  set user
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
                <button onClick={() => navigate("/MyInfo")}>개인정보수정</button>
            </Dashboard>
            <ul>
                {filterdPosts.map((post) => {
                    return (
                        <li key={post.id}>
                            <PostCard post={post} />;
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default MyPage;

//데이터 저장시 스토리지 사용 (네트워크 이미지사용)
