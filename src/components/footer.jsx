import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <>
            <StyledDiv>
                <StyledFooter>
                    <StyledFooterContainer>
                        <StyledTeamNameContainer>
                            <StyledFooterTitle>
                                <strong>사조참치</strong>
                            </StyledFooterTitle>
                            <StyledFooterEnTitle>BinCan</StyledFooterEnTitle>
                        </StyledTeamNameContainer>

                        <StyledTeamCopyrightContainer>
                            <StyledFooterDiv>
                                <StyledCopyrigntTitle>
                                    <strong>팀원</strong>
                                </StyledCopyrigntTitle>
                                <StyledFooterEnTitle>이예람 류지원 장종호 김태흔</StyledFooterEnTitle>
                            </StyledFooterDiv>

                            <StyledCopyrightContainer>
                                <StyledCopyrightYear>&copy; 2024 Sajo Tuna</StyledCopyrightYear>
                                <StyledCopyrightContent>All rights reserved</StyledCopyrightContent>
                            </StyledCopyrightContainer>
                        </StyledTeamCopyrightContainer>
                    </StyledFooterContainer>
                </StyledFooter>
            </StyledDiv>
        </>
    );
};

export default Footer;

const StyledDiv = styled.div``;

const StyledFooter = styled.div`
    background-color: #efefef;
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    /* position: fixed; */
    bottom: 0;
    margin-top: 80px;
`;
const StyledFooterDiv = styled.div`
    display: inline-block;
`;

const StyledFooterContainer = styled.div`
    width: 1280px;
    padding: 60px 0;
`;
const StyledTeamNameContainer = styled.div``;
const StyledFooterTitle = styled.div`
    width: 100px;
`;
const StyledFooterEnTitle = styled.div``;
const StyledTeamCopyrightContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;
const StyledCopyrigntTitle = styled.div``;
const StyledCopyrightContainer = styled.div``;
const StyledCopyrightYear = styled.div``;
const StyledCopyrightContent = styled.div``;
