import { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate } from "react-router-dom";
import MyPage from "./MyPage";

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

    const engValidation = /^[A-Za-z0-9.]+$/g; // 영어랑 숫자만 포함하는 정규표현식
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

    // 프로필 세팅
    async function checkProfile() {
        // 기본 이미지 "Group 66.png" 셋팅
        const { data } = supabase.storage.from("UserProfile").getPublicUrl("Group_66.png");
        setImgUrl(data.publicUrl);
    }

    // 프로필 사진 변경
    async function handleFileInputChange(files) {
        const [file] = files;

        // 파일이 없으면 리턴
        if (!file) {
            return;
        }

        // 파일명 유효성검사 => only eng & num
        if (!engValidation.test(file.name)) {
            alert("파일명이 잘못되었습니다. 영어 또는 숫자만 가능합니다.");
            return;
        }

        // 로컬스토리지에 파일명으로 저장
        // 프로필 사진은 1개만 사용하므로 덮어쓰기(upsert:true)
        const { data } = await supabase.storage.from("UserProfile").upload(file.name, file, { upsert: true });

        setImgUrl(supabase.storage.from("UserProfile").getPublicUrl(file.name).data.publicUrl);
    }

    return (
        <div>
            <div>
                <h1>개인정보 수정</h1>

                <p>프로필 사진</p>
                <img src={imgUrl} alt="빈캔" width="50%" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInputChange(e.target.files)}
                    ref={fileInputRef}
                />

                <p>이메일</p>
                {/* 조건부 랜더링 */}
                {user && <input type="text" value={user?.user?.email} disabled />}

                <p>닉네임</p>
                <input
                    type="text"
                    value={nickName}
                    onChange={(e) => {
                        setNickName(e.target.value);
                    }}
                />

                <p>자기소개</p>
                <input
                    type="text"
                    value={intro}
                    onChange={(e) => {
                        setIntro(e.target.value);
                    }}
                />
            </div>

            <div>
                <button onClick={updateUserData}>수정하기</button>
                <button
                    onClick={() => {
                        navigate(`/mypage?id=${user.user.id}`);
                    }}
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default MyInfo;
