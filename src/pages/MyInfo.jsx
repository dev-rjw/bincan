import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate } from "react-router-dom";
import MyPage from "./MyPage";

const MyInfo = () => {
    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState();
    const [nickName, setNickName] = useState();
    const [intro, setIntro] = useState();

    const { user } = useContext(PostsContext);

    const updateUserData = async () => {
        const { data, error } = await supabase.auth.updateUser({
            // email: user.user.email,

            data: {
                profileUrl: imgUrl,
                nickName: nickName,
                intro: intro
            }
        });
        if (data) {
            alert("수정되었습니다.");
            navigate("/mypage");
        }
    };

    const onchangeImageUpload = (e) => {
        const { files } = e.target;
        const uploadFile = files[0];

        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => setImgUrl(reader.result);
    };

    // async function checkProfile() {
    //     //프로필 유효성 검사
    //     const { data: userData } = await supabase.auth.getUser();
    //     const userProfileUrl = userData.user.user_metadata.profileUrl;
    //     //null 병합 연산자를 사용하여 프로필이미지 상태 탐지 및 반환 // 기본 이미지 "Group 66.png"
    //     const { data } = supabase.storage.from("UserProfile").getPublicUrl("Group_66.png");
    //     setProfileUrl(data.publicUrl);
    //     console.log(data.publicUrl);
    // }

    return (
        <div>
            <div>
                <h1>개인정보 수정</h1>
                <p>프로필 사진</p>
                <img src={imgUrl} alt="" width="50%" />
                <input type="file" onChange={onchangeImageUpload} />

                <p>이메일</p>
                {/* 조건부 랜더링 */}
                {user && <input type="text" value={user?.user.email} disabled />}

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
