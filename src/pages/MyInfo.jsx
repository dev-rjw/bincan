import { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledBtn } from "../components/StyledComponents/StyledButton";
import { Input } from "../components/StyledComponents/StyledInput";

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
                nickName: nickName,
                intro: intro
            }
        });
        if (data) {
            alert("수정되었습니다.");
            navigate(`/mypage?id=${data.user.id}`);
        }
    };

    async function checkProfile() {
        const { data } = supabase.storage.from("UserProfile").getPublicUrl("Group_66.png");
        setImgUrl(data.publicUrl);
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
        <div>
            <div>
                <h1>개인정보 수정</h1>

                <p>프로필 사진</p>

                <img src={imgUrl} alt="빈캔" width="20%" />
                <StyledimgInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInputChange(e.target.files)}
                    ref={fileInputRef}
                />

                <p>이메일</p>
                {user && <Input type="text" value={user?.user.email} disabled />}

                <p>닉네임</p>
                <Input
                    type="text"
                    value={nickName}
                    onChange={(e) => {
                        setNickName(e.target.value);
                    }}
                />

                <p>자기소개</p>
                <Input
                    type="text"
                    value={intro}
                    onChange={(e) => {
                        setIntro(e.target.value);
                    }}
                />
            </div>

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
        </div>
    );
};

export default MyInfo;

const StyledimgInput = styled.input`
    width: 15%;
    height: 35px;
    background-color: #edb432;
    color: white;
    border-radius: 5px;
    cursor: pointer;

    &:focus {
        background-color: #edb432;
    }
`;
