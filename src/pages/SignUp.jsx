import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import styled from "styled-components";

function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const fileInputRef = useRef(null);

    //정규표현식
    var engValidation = /^[A-Za-z.]+$/g; // 영어
    var emailValidation = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/; // 이메일형식

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
                    profileUrl: null
                }
            }
        });
        navigate("/login");
    };

    // 프로필
    async function checkProfile() {
        const { data: userData } = await supabase.auth.getUser();
        // const userProfileUrl = userData.user.user_metadata.profileUrl;

        //null 병합 연산자를 사용하여 프로필이미지 상태 탐지 및 반환 // 기본 이미지 "Group 66.png"
        const { data } = supabase.storage.from("UserProfile").getPublicUrl("Group_66.png");
        setProfileUrl(data.publicUrl);
    }

    // 프로필 사진 변경
    async function handleFileInputChange(files) {
        const [file] = files;
        // console.log(file);

        // 파일이 없으면 리턴
        if (!file) {
            return;
        }

        // 파일명 유효성검사 => 한글x 띄어쓰기x, 특수문자x
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
        // console.log(supabase.storage.from("UserProfile").getPublicUrl(file.name));

        // 고마워요 준호님
    }

    useEffect(() => {
        getUserData();
        checkProfile();
    }, []);

    return (
        <div>
            <Form onSubmit={SignUp}>
                <User>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input value={nickName} onChange={(e) => setNickName(e.target.value)} />
                </User>
                <ProfileImg>
                    <InputImg onChange={(e) => handleFileInputChange(e.target.files)} type="file" ref={fileInputRef} />
                    <Img src={profileUrl} alt="profile" onClick={() => fileInputRef.current.click()} />
                </ProfileImg>
                <Button type="submit">확인</Button>
            </Form>
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
`;

const ProfileImg = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputImg = styled.input`
    position: absolute;
    right: 10px;
    top: 450px;

    background-color: #edb432;
    border-radius: 10px;
    color: white;
`;

const Img = styled.img`
    position: absolute;
    right: 100px;
    top: 100px;
    width: 250px;
    height: 250px;
    border: solid 7px #edb432;
    border-radius: 10px;

    background-color: #ffffff;
`;

const Button = styled.button`
    background-color: #edb432;
    color: white;
`;
