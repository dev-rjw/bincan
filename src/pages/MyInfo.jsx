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
        <StyledMyInfoWrap>
            <StyledInfo>
                <div>
                    <h1>개인정보 수정</h1>
                    <h2>프로필 사진</h2>
                    <img src={imgUrl} alt="빈캔" width="373px" />

                    <StyledimgInput
                        id="styleLabel"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileInputChange(e.target.files)}
                        ref={fileInputRef}
                    />
                    <Styledlabel htmlFor="styleLabel">파일선택</Styledlabel>
                </div>
                <StyledInputWrap>
                    <h2>이메일</h2>
                    {user && <Input type="text" value={user?.user?.email} disabled />}

                    <h2>닉네임</h2>
                    <Input
                        type="text"
                        value={nickName}
                        onChange={(e) => {
                            setNickName(e.target.value);
                        }}
                    />
                    <h2>자기소개</h2>
                    <Input
                        type="text"
                        value={intro}
                        onChange={(e) => {
                            setIntro(e.target.value);
                        }}
                    />
                    <div>
                        <StyledBtn onClick={updateUserData}>수정하기</StyledBtn>
                        <StyledBtn
                            onClick={() => {
                                navigate(`/mypage?id=${user.user.id}`);
                            }}
                        >
                            취소
                        </StyledBtn>
                    </div>
                </StyledInputWrap>
            </StyledInfo>
        </StyledMyInfoWrap>
    );
};

export default MyInfo;

const StyledInputWrap = styled.div`
    margin-top: 55px;
`;
const StyledMyInfoWrap = styled.div`
    background-color: #d9d9d9;
    margin-top: 50px;
    padding-bottom: 50px;
`;

const StyledInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StyledimgInput = styled.input`
    position: absolute;
    visibility: hidden;

    cursor: pointer;

    &:focus {
        background-color: #edb432;
    }
`;

const Styledlabel = styled.label`
    display: flex;
    justify-content: space-around;
    padding: 10px;

    margin: auto;
    margin-top: 30px;
    width: 125px;
    height: 35px;

    background-color: #edb432;
    color: white;

    cursor: pointer;
    border-radius: 3px;

    &:hover {
        background-color: #f6e6c2;
        color: #edb432;
    }
`;

export const StyledBtn = styled.button`
    margin: 10px;
    margin-top: 30px;
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
