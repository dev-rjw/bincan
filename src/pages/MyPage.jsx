import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import { supabase } from "../supabase";
import { StyledBtn } from "../components/StyledComponents/StyledButton";
import { Div } from "../components/StyledComponents/StyledDiv";

function MyPage() {
    const navigate = useNavigate();
    const { posts, user, setUser } = useContext(PostsContext);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");

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
            <Div>
                <div>
                    <Img src={user?.user.user_metadata.profileUrl} alt="" width="20%" />
                </div>
                <div>
                    <h2>닉네임</h2>
                    <p>{user?.user.user_metadata.nickName}</p>

                    <h2>이메일</h2>
                    <p>{user?.user.email}</p>

                    <h2>자기소개</h2>
                    <p>{user?.user.user_metadata.intro ? user?.user.user_metadata.intro : "자기소개를 등록해주세요"}</p>
                    <StyledBtn onClick={() => navigate("/MyInfo")}>개인정보수정</StyledBtn>
                </div>
            </Div>
            <PostList id={userId} />
        </>
    );
}

export default MyPage;

export const Img = styled.img``;
