import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import { supabase } from "../supabase";
import { Div } from "../components/StyledComponents/StyledDiv";

function MyPage() {
    const navigate = useNavigate();
    const [setPost] = useState([]);
    const { user, setUser } = useContext(PostsContext);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    const getComment = async () => {
        let { data, error } = await supabase.from("post").select("*").eq("post_id", userId);
        if (error) console.log(error);

        setPost(data[0]);
    };

    useEffect(() => {
        getUser();
        getComment();
    }, []);

    return (
        <>
            <StyledMypageContainer>
                <StyledMyPage>
                    <StyledContentTitle>{user?.user?.user_metadata.nickName}님의 마이페이지</StyledContentTitle>
                </StyledMyPage>
                <StyledDiv>
                    <StyledLeftArea>
                        <StyledImg src={user?.user?.user_metadata.profileUrl} alt="" />
                    </StyledLeftArea>

                    <StyledRightArea>
                        <div>
                            <StyledTitle>이메일</StyledTitle>
                            <StyledContent>{user?.user?.email}</StyledContent>

                            <StyledTitle>닉네임</StyledTitle>
                            <StyledContent>{user?.user?.user_metadata.nickName}</StyledContent>

                            <StyledTitle>자기소개</StyledTitle>
                            <StyledContentIntroduction>
                                {user?.user?.user_metadata.intro
                                    ? user?.user?.user_metadata.intro
                                    : "자기소개를 등록해주세요"}
                            </StyledContentIntroduction>
                        </div>
                        <StyledBtn onClick={() => navigate("/MyInfo")}>개인정보수정</StyledBtn>
                    </StyledRightArea>
                </StyledDiv>

                <StyledMyContentContainer>
                    <StyledContentTitle>{user?.user?.user_metadata.nickName}님의 게시물</StyledContentTitle>
                    <StyledMyContentContainer>
                        <PostList id={userId} />
                    </StyledMyContentContainer>
                </StyledMyContentContainer>
            </StyledMypageContainer>
        </>
    );
}

export default MyPage;

const StyledMypageContainer = styled.div`
    width: 100%;
`;

const StyledMyPage = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledDiv = styled.div`
    width: 1280px;
    height: 500px;
    display: flex;
    /* flex-direction: row; */
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 30px;
    padding: 10px;
    background-color: #edb432;
    border-radius: 12px;
`;

const StyledLeftArea = styled.div`
    flex: 5;
    display: flex;
`;

const StyledImg = styled.img`
    width: 400px;
    height: 300px;
    object-fit: cover;
    margin: 0 100px;
    border-radius: 8px;
    border: solid 2px #f1d594;
`;

const StyledRightArea = styled.div`
    flex: 7;
    position: relative;
    z-index: 0;
`;

const StyledTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
`;

const StyledContent = styled.div`
    width: 90%;
    height: 45px;
    background-color: #f1d594;
    border-radius: 8px;
    border: none;
    padding: 15px;
    margin-bottom: 20px;
`;

const StyledContentIntroduction = styled.div`
    width: 90%;
    height: 120px;
    background-color: #f1d594;
    border-radius: 8px;
    border: none;
    resize: none;
    padding: 15px;
`;

const StyledBtn = styled.button`
    width: 150px;
    height: 35px;
    background-color: #edb432;
    color: white;
    border: 1px solid white;
    margin-top: 20px;
    border-radius: 8px;
    cursor: pointer;
    position: absolute;
    margin-right: 65px;
    right: 0;

    &:hover {
        background-color: white;
        color: #edb432;
    }
`;

const StyledContentTitle = styled.div`
    margin-top: 70px;
    font-size: 20px;
`;

const StyledMyContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
