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
        <StyledNavContainer>
            <StyledNavContent>
                <StNavLeft>
                    <StEmptyNav>
                        {user?.user?.email ? (
                            <>
                                {user?.user.email}님, <br />
                                지갑은 안녕하시렵니까?
                            </>
                        ) : (
                            "Bin-Can"
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
        </StyledNavContainer>
    );
};

export default NavHeader;

const StyledNavContainer = styled.nav`
    width: 100%;
    height: 100px;

    position: sticky;
    top: 0px;

    display: flex;
    justify-content: center;
    background-color: #edb432;
`;

const StyledNavContent = styled.nav`
    width: 1280px;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
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

const StNavLogo = styled.img`
    /* width: 100%; */
`;

const StNavRight = styled.div`
    display: flex;
    width: 200px;
    justify-content: flex-end;
    align-items: center;
`;
const StNavMenu = styled.div`
    margin-left: 15px;
`;
