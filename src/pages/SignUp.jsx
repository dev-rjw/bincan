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
        // 기본 프로필
        // const { data } = supabase.storage.from("UserProfile").getPublicUrl("Group 66.png");
        //프로필 유효성 검사
        const { data: userData } = await supabase.auth.getUser();
        const userProfileUrl = userData.user.user_metadata.profileUrl;

        //null 병합 연산자를 사용하여 프로필 상태 탐지 및 반환
        const profileImg = supabase.storage.from("UserProfile").getPublicUrl(userProfileUrl ?? "Group 66.png")
            .data.publicUrl;

        setProfileUrl(profileImg);
    }

    // 프로필 사진 변경
    async function handleFileInputChange(files) {
        const [file] = files;
        console.log(file);

        // 파일이 없으면 리턴
        if (!file) {
            return;
        }

        // 파일명 유효성검사 => 한글x 띄어쓰기x, 특수문자x

        const { data } = await supabase.storage.from("UserProfile").upload(file.name, file); //같은 이미지 업로드시 오류발생 어떻게 해결하냐이거
        //upsert: true 덮어쓰기 할?말? 말

        //유저 정보 업데이트
        const { data: profileUrl, error } = await supabase.auth.updateUser({
            data: { profileUrl: supabase.storage.from("UserProfile").getPublicUrl(file.name).data.publicUrl }
        });

        setProfileUrl(supabase.storage.from("UserProfile").getPublicUrl(file.name).data.publicUrl);
        console.log(supabase.storage.from("UserProfile").getPublicUrl(file.name));

        // 고마워요 준호님
    }

    useEffect(() => {
        getUserData();
        checkProfile();
    }, []);

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
                <img
                    className="rounded-full cursor-pointer"
                    width={300}
                    height={300}
                    border={10}
                    src={profileUrl}
                    alt="profile"
                    onClick={() => fileInputRef.current.click()}
                />
                <button type="submit">확인</button>
            </form>
        </div>
    );
}

export default SignUp;
