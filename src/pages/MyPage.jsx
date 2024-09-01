import styled from "styled-components";
import MyModal from "./../components/MyModal";
import { useContext } from "react";
import { PostsContext } from "../App";

const Dashboard = styled.div`
    background-color: greenyellow;
`;

function MyPage() {
    const { posts, user } = useContext(PostsContext);

    return (
        <>
            <Dashboard>
                <img src="{post.img_url}" alt="" />
                <h2>닉네임</h2>
                <p>{user?.user.user_metadata.nickName}</p>
                <h2>이메일</h2>
                <p>{user?.user.email}</p>
                <h2>자기소개</h2>
                {/* <p>{intro}</p> */}
                <MyModal />
            </Dashboard>
        </>
    );
}

export default MyPage;
