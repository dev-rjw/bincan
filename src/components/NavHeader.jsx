import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostsContext } from "../App";

const NavHeader = () => {
    const navigate = useNavigate();
    const { user } = useContext(PostsContext);

    return (
        <>
            <StNavContainer>
                <StNavContent>
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
                        <StNavMenu
                            onClick={() => {
                                navigate(`/mypage?id=${user?.user.id}`);
                            }}
                        >
                            마이페이지
                        </StNavMenu>
                        <StNavMenu
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            로그인
                        </StNavMenu>
                    </StNavRight>
                </StNavContent>
            </StNavContainer>
        </>
    );
};

export default NavHeader;

const StNavContainer = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    /* background-color: red; */
    height: 80px;
`;

const StNavContent = styled.nav`
    width: 1280px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 1px solid red;
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
