import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import styled from "styled-components";
import { Input, StyledInput } from "../components/StyledComponents/StyledInput";
import { StyledBtn } from "../components/StyledComponents/StyledButton";
import { StyledLogo } from "../components/StyledComponents/StyledLogo";

function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const fileInputRef = useRef(null);

    // 정규표현식 영어대소문자,_
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
        <Form onSubmit={SignUp}>
            <StyledLogo
                alt="X"
                src="https://ltmlsvowetkigjbwwqwy.supabase.co/storage/v1/object/public/UserProfile/bbin.svg
                    "
            ></StyledLogo>
            <Div>
                <User>
                    <Font>이메일</Font>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Font>비밀번호</Font>
                    <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Font>닉네임</Font>
                    <Input value={nickName} onChange={(e) => setNickName(e.target.value)} />
                </User>
                <ProfileImg>
                    <Img src={profileUrl} alt="profile" onClick={() => fileInputRef.current.click()} />
                    <Input
                        display="none"
                        id="styledLabel"
                        onChange={(e) => handleFileInputChange(e.target.files)}
                        type="file"
                        ref={fileInputRef}
                    />
                    <FileBut htmlFor="styledLabel">🔗 FILE UPLOAD</FileBut>
                </ProfileImg>
            </Div>
            <StyledBtn type="submit">확인</StyledBtn>
        </Form>
    );
}

export default SignUp;

const FileBut = styled.label`
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin: auto;
    margin-top: 30px;
    width: 200px;
    height: 35px;

    background-color: #edb432;
    color: white;

    cursor: pointer;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
    margin-top: 150px;
    margin-left: 100px;
`;

const Img = styled.img`
    margin-bottom: 10px;

    right: 100px;
    top: 100px;

    width: 250px;
    height: 250px;

    border: solid 1px #edb432;

    background-color: #ffffff;
`;

const Font = styled.p`
    margin: 1px;
    margin-top: 2%;
    margin-bottom: 13px;
`;
