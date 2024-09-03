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

    var engValidation = /^[A-Za-z.]+$/g;

    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
    };

    const SignUp = async (e) => {
        e.preventDefault();

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
        }

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

    async function checkProfile() {
        const { data: userData } = await supabase.auth.getUser();

        const { data } = supabase.storage.from("UserProfile").getPublicUrl("Group_66.png");
        setProfileUrl(data.publicUrl);
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
