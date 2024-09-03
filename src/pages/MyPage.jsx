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
            <Div2>
                <Div>
                    <div>
                        <Img src={user?.user?.user_metadata.profileUrl} alt="" />
                    </div>
                    <div>
                        <div>
                            <H2>닉네임</H2>
                            <p>{user?.user?.user_metadata.nickName}</p>

                            <H2>이메일</H2>
                            <p>{user?.user?.email}</p>

                            <H2>자기소개</H2>
                            <p>
                                {user?.user?.user_metadata.intro
                                    ? user?.user?.user_metadata.intro
                                    : "자기소개를 등록해주세요"}
                            </p>
                        </div>
                        <StyledBtn onClick={() => navigate("/MyInfo")}>개인정보수정</StyledBtn>
                    </div>
                </Div>
                <div>
                    <P>{user?.user?.user_metadata.nickName}님의 게시물</P>
                    <PostList id={userId} />
                </div>
            </Div2>
        </>
    );
}

export default MyPage;

const P = styled.p`
    margin-top: 80px;
    margin-left: 30px;
`;

const H2 = styled.h2`
    font-size: 20px;
`;

const Div2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Img = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin-right: 180px;
    border: solid 3px #edb432;
`;

export const StyledBtn = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 400px;

    margin-top: 50px;
    width: 125px;
    height: 35px;

    font-size: 15px;
    color: #ffffff;

    border: none;
    border-radius: 3px;

    padding: 10px;
    background-color: #edb432;
    cursor: pointe;

    &:hover {
        background-color: #f6e6c2;
        color: #edb432;
    }
`;
