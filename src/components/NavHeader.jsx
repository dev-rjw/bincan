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
    };

    return (
        <StyledNavContainer>
            <StyledNavContent>
                <StyledNavLeft>
                    <StyledEmptyNav>
                        {user?.user?.email ? (
                            <>
                                {user?.user?.user_metadata.nickName}님, <br />
                                지갑은 안녕하시렵니까?
                            </>
                        ) : (
                            "Bin-Can"
                        )}
                    </StyledEmptyNav>
                </StyledNavLeft>
                <StyledNavCenter>
                    <StyledNavLogo
                        src="https://ltmlsvowetkigjbwwqwy.supabase.co/storage/v1/object/public/UserProfile/Group%2068.png"
                        alt="bincan"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </StyledNavCenter>
                <StyledNavRight>
                    {user?.user?.email ? (
                        <>
                            <StyledNavMenu
                                onClick={() => {
                                    navigate(`/mypage?id=${user?.user.id}`);
                                }}
                            >
                                마이페이지
                            </StyledNavMenu>
                            <Logout />
                        </>
                    ) : (
                        <>
                            <StyledNavMenu
                                onClick={() => {
                                    navigate(`/signup`);
                                }}
                            >
                                회원가입
                            </StyledNavMenu>
                            <StyledNavMenu
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                로그인
                            </StyledNavMenu>
                        </>
                    )}
                </StyledNavRight>
            </StyledNavContent>
        </StyledNavContainer>
    );
};

export default NavHeader;

const StyledNavContainer = styled.nav`
    width: 100%;
    position: sticky;
    top: 0px;
    display: flex;
    justify-content: center;
    background-color: #efefef;
    z-index: 100;
`;

const StyledNavContent = styled.nav`
    width: 1280px;
    height: 120px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledNavLeft = styled.div``;

const StyledEmptyNav = styled.div`
    width: 200px;
`;

const StyledNavCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
`;

const StyledNavLogo = styled.img`
    width: 100px;
`;

const StyledNavRight = styled.div`
    display: flex;
    width: 200px;
    justify-content: flex-end;
    align-items: center;
`;
const StyledNavMenu = styled.div`
    margin-right: 20px;
`;
