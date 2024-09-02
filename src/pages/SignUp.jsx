import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        getUserData();
    }, []);

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
                    profileUrl: setProfileUrl
                    // 문제
                }
            }
        });
        navigate("/login");
    };

    // 프로필
    async function checkProfile() {
        const { data: userData } = await supabase.auth.getUser();

        const userProfileUrl = userData.user.user_metadata.profileUrl;
        //옵셔널체이닝

        const { data } = supabase.storage.from("avatars").getPublicUrl(userProfileUrl ?? "default-profile.jpg");

        setProfileUrl(data.publicUrl);
    }

    // 프로필 사진 변경
    async function handleFileInputChange(files) {
        const [file] = files;

        // 파일이 없으면 그냥 리턴
        if (!file) {
            return;
        }

        const { data } = await supabase.storage.from("avatars").upload(`avatar_${Date.now()}.png`, file);

        // data.path = 프로필 이미지 넘버링
        setProfileUrl(`https://yhqidmepyhxhostsyirn.supabase.co/storage/v1/object/public/avatars/${data.path}`);
    }

    return (
        <div>
            <form onSubmit={SignUp}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
                <input value={nickName} onChange={(e) => setNickName(e.target.value)} />
                <input
                    onChange={(e) => handleFileInputChange(e.target.files)}
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                />
                <button type="submit">확인</button>
            </form>
        </div>
    );
}

export default SignUp;
