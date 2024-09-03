import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import styled from "styled-components";
import { Input } from "../components/StyledComponents/StyledInput";
import { StyledBtn } from "../components/StyledComponents/StyledButton";

function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const fileInputRef = useRef(null);

    //정규표현식
    var engValidation = /^[A-Za-z.]+$/g; // 영어랑.만 포함하는 정규표현식

    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
    };

    const SignUp = async (e) => {
        e.preventDefault();

        // input 공백 유효성 검사
        if (!email) {
            alert("이메일을 입력해주세요");
            return;
        } else if (!password) {
            alert("비밀번호를 입력해주세요");
            return;
        } else if (password.length < 6) {
            alert("6자리 이상의 비밀 번호를 설정해주세요");
            return;
        } else if (!nickName) {
            alert("닉네임을 입력해주세요");
            return;
        } // 프로필 사진은 필수 입력값이 아니기때문에 프로필을 제외하기 위해 else를 쓰지 않음);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    nickName: nickName,
                    profileUrl: profileUrl
                }
            }
        });

        if (error) {
            console.log(error);
        } else if (data) {
            alert("회원가입을 환영합니다. 로그인페이지로 이동합니다.");
            navigate("/login");
        }
    };

    // 프로필
    async function checkProfile() {
        const { data: userData } = await supabase.auth.getUser();

        // 기본 이미지 "Group 66.png" 셋팅
        const { data } = supabase.storage.from("UserProfile").getPublicUrl("Group_66.png");
        setProfileUrl(data.publicUrl);
    }

    // 프로필 사진 변경
    async function handleFileInputChange(files) {
        const [file] = files;

        // 파일이 없으면 리턴
        if (!file) {
            return;
        }

        // 파일명 유효성검사 => only eng & .
        if (!engValidation.test(file.name)) {
            alert("파일명이 잘못되었습니다. 영어 또는 숫자만 가능합니다.");
            return;
        }

        // 로컬스토리지에 파일명으로 저장 // 프로필사진은 1개만 사용하므로 덮어쓰기(upsert:true)
        const { data } = await supabase.storage.from("UserProfile").upload(file.name, file, { upsert: true });

        //유저 정보 업데이트
        const { data: profileUrl, error } = await supabase.auth.updateUser({
            data: { profileUrl: supabase.storage.from("UserProfile").getPublicUrl(file.name).data.publicUrl }
        });

        setProfileUrl(supabase.storage.from("UserProfile").getPublicUrl(file.name).data.publicUrl);
    }

    useEffect(() => {
        getUserData();
        checkProfile();
    }, []);

    return (
        <div>
            <Form onSubmit={SignUp}>
                <User>
                    이메일 : <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    패스워드 : <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                    닉네임 : <Input value={nickName} onChange={(e) => setNickName(e.target.value)} />
                </User>
                <ProfileImg>
                    <Img src={profileUrl} alt="profile" onClick={() => fileInputRef.current.click()} />
                    <input onChange={(e) => handleFileInputChange(e.target.files)} type="file" ref={fileInputRef} />
                </ProfileImg>
            </Form>
            <StyledBtn type="submit">확인</StyledBtn>
        </div>
    );
}

export default SignUp;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const User = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 100px;
`;

const ProfileImg = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 150px;
    margin-left: 100px;
`;

const Img = styled.img`
    /* position: absolute; */

    margin-bottom: 10px;
    right: 100px;
    top: 100px;
    width: 250px;
    height: 250px;
    border: solid 7px #edb432;
    border-radius: 10px;

    background-color: #ffffff;
`;
