import React from "react";
import styled from "styled-components";

function Detail() {
    return (
        <>
            <StDetailContainer>
                <StBtnContainer>
                    <StBtnWrapper>
                        <StEditBtn>수정하기</StEditBtn>
                        <StDeleteBtn>삭제하기</StDeleteBtn>
                    </StBtnWrapper>
                </StBtnContainer>
            </StDetailContainer>

            <StContentContainer>
                <StContentArea>
                    <StRightArea></StRightArea>
                    <StLeftArea>
                        <div>안녕하세요</div>
                    </StLeftArea>
                </StContentArea>
            </StContentContainer>
        </>
    );
}

export default Detail;

const StDetailContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const StBtnContainer = styled.div`
    width: 1280px;
    height: 20px;
    background-color: purple;
    margin-top: 80px;
`;
const StBtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const StEditBtn = styled.div``;
const StDeleteBtn = styled.div`
    margin-left: 20px;
`;

const StContentContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const StContentArea = styled.div`
    width: 1280px;
    height: 400px;
    /* background-color: blue; */
    display: flex;
`;

const StRightArea = styled.div`
    flex: 1;
    background-color: blue;
`;
const StLeftArea = styled.div`
    background-color: green;
    flex: 1;
`;
