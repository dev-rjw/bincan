import { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../components/StyledComponents/StyledInput";
import { color } from "framer-motion";

const MyInfo = () => {
    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState("");
    const [nickName, setNickName] = useState("");
    const [intro, setIntro] = useState("");

    const { user, setUser } = useContext(PostsContext);

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    const engValidation = /^[A-Za-z0-9.]+$/g;
    const fileInputRef = useRef(null);

    useEffect(() => {
        getUser();
        checkProfile();
    }, []);

    const updateUserData = async () => {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                profileUrl: imgUrl,
                nickName: nickName.replaceAll(" ", ""),
                intro: intro
            }
        });
        if (data) {
            alert("수정되었습니다.");
            navigate(`/mypage?id=${data.user.id}`);
        }
    };

    async function checkProfile() {
        setImgUrl(user?.user?.user_metadata.profileUrl);
        setNickName(user?.user?.user_metadata.nickName);
        setIntro(user?.user?.user_metadata.intro);
    }

    async function handleFileInputChange(files) {
        const [file] = files;

        if (!file) {
            return;
        }

        if (!engValidation.test(file.name)) {
            alert("파일명이 잘못되었습니다. 영어 또는 숫자만 가능합니다.");
            return;
        }

        const { data } = await supabase.storage.from("UserProfile").upload(file.name, file, { upsert: true });

        setImgUrl(supabase.storage.from("UserProfile").getPublicUrl(file.name).data.publicUrl);
    }

    return (
        <StyledMypageContainer>
            <StyledMyPage>
                <StyledContentTitle>{user?.user?.user_metadata.nickName}님의 개인정보 수정 페이지</StyledContentTitle>
            </StyledMyPage>

            <StyledDiv>
                <StyledLeftArea>
                    <StyledLeftContainer>
                        <StyledTitle>프로필 사진</StyledTitle>
                        <StyledImg src={imgUrl} alt="빈캔" width="373px" />

                        <StyledImgInput
                            id="styleLabel"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileInputChange(e.target.files)}
                            ref={fileInputRef}
                        />
                        <StyledLabel htmlFor="styleLabel">파일선택</StyledLabel>
                    </StyledLeftContainer>
                </StyledLeftArea>

                <StyledRightArea>
                    <div>
                        <StyledInputWrap>
                            <StyledTitle>이메일</StyledTitle>
                            {user && <StyledContentInput type="text" value={user?.user?.email} disabled />}

                            <StyledTitle>닉네임</StyledTitle>
                            <StyledContentInput
                                type="text"
                                value={nickName}
                                onChange={(e) => {
                                    setNickName(e.target.value);
                                }}
                            />

                            <StyledTitle>자기소개</StyledTitle>
                            <StyledContentIntroduction
                                type="text"
                                value={intro}
                                onChange={(e) => {
                                    setIntro(e.target.value);
                                }}
                            />
                            <StyledBtnContainer>
                                <StyledBtn onClick={updateUserData}>수정하기</StyledBtn>
                                <StyledBtn
                                    onClick={() => {
                                        navigate(`/mypage?id=${user.user.id}`);
                                    }}
                                >
                                    취소
                                </StyledBtn>
                            </StyledBtnContainer>
                        </StyledInputWrap>
                    </div>
                </StyledRightArea>
            </StyledDiv>
        </StyledMypageContainer>
    );
};

export default MyInfo;

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
    flex-direction: column;
`;

const StyledLeftContainer = styled.div`
    margin-left: 100px;
    justify-content: center;
`;

const StyledImg = styled.img`
    width: 350px;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
    border: solid 2px #f1d594;
    justify-content: center;
    align-items: center;
`;

const StyledLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 35px;
    border-radius: 8px;
    /* border: 1px solid white; */
    background-color: #edb432;
    color: white;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 100px;
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
const StyledContentIntroduction = styled.textarea`
    width: 90%;
    height: 120px;
    background-color: #f1d594;
    border-radius: 8px;
    border: none;
    resize: none;
    padding: 15px;
`;

const StyledContentTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin: 70px 0 10px 0;
`;

const StyledContentInput = styled.input`
    width: 90%;
    height: 45px;
    background-color: #f1d594;
    border-radius: 8px;
    border: none;
    padding: 15px;
    margin-bottom: 20px;
`;

const StyledInputWrap = styled.div``;

const StyledImgInput = styled.input`
    visibility: hidden;
    cursor: pointer;

    &:focus {
        background-color: #edb432;
    }
`;

const StyledBtnContainer = styled.div`
    position: absolute;
    gap: 10px;
    right: 0;
    margin-right: 74px;
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
    /* position: absolute; */
    margin-left: 20px;
    right: 0;

    &:hover {
        background-color: white;
        color: #edb432;
    }
`;
