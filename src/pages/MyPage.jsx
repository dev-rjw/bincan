import styled from "styled-components";
import MyModal from "./../components/MyModal";
import { useContext } from "react";
import { PostsContext } from "../App";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";

const Dashboard = styled.div`
    background-color: greenyellow;
`;

function MyPage({ intro }) {
    const { posts, user } = useContext(PostsContext);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");

    const filterdPosts = posts.filter((post) => post.user_id === userId);

    return (
        <>
            <Dashboard>
                <img src="{post.img_url}" alt="" />
                <h2>닉네임</h2>
                <p>{user?.user.user_metadata.nickName}</p>
                <h2>이메일</h2>
                <p>{user?.user.email}</p>
                <h2>자기소개</h2>
                <p>{intro ? user?.user.user_metadata.intro : "자기소개를 등록해주세요"}</p>
                <MyModal />
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
