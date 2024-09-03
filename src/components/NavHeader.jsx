import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostsContext } from "../App";
import Logout from "./Logout";
import { supabase } from "../supabase";

const NavHeader = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(PostsContext);

    useEffect(() => {
        getUser();
    }, []);

    // user
    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
        console.log(data);
    };

    return (
        <StNavContainer>
            <StyledNavContent>
                <StNavLeft>
                    <StEmptyNav>
                        {user?.user?.email ? (
                            <>
                                {user?.user.email}님, <br />
                                지갑은 안녕하시렵니까?
                            </>
                        ) : (
                            "로그인이 필요합니다."
                        )}
                    </StEmptyNav>
                </StNavLeft>
                <StNavCenter>
                    <StNavLogo
                        src="hi"
                        alt="bincan"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </StNavCenter>
                <StNavRight>
                    {user?.user?.email ? (
                        <>
                            <StNavMenu
                                onClick={() => {
                                    navigate(`/mypage?id=${user?.user.id}`);
                                }}
                            >
                                마이페이지
                            </StNavMenu>
                            <Logout />
                        </>
                    ) : (
                        <>
                            <StNavMenu
                                onClick={() => {
                                    navigate(`/signup`);
                                }}
                            >
                                회원가입
                            </StNavMenu>
                            <StNavMenu
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                로그인
                            </StNavMenu>
                        </>
                    )}
                </StNavRight>
            </StyledNavContent>
        </StNavContainer>
    );
};

export default NavHeader;

const StNavContainer = styled.nav`
    display: flex;
    justify-content: center;
    // 헤더 상단 고정
    position: sticky;
    top: 0px;

    width: 100%;
    height: 80px;

    background-color: blue;
`;

const StyledNavContent = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 1280px;
    height: 80px;

    border: 1px solid red;

    background-color: red;
`;

const StNavLeft = styled.div``;

const StEmptyNav = styled.div`
    width: 200px;
`;

const StNavCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
`;

const StNavLogo = styled.img``;

const StNavRight = styled.div`
    display: flex;
    width: 200px;
    justify-content: flex-end;
    align-items: center;
`;
const StNavMenu = styled.div`
    margin-left: 15px;
`;
