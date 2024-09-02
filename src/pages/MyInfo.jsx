import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate } from "react-router-dom";

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
        console.log(data);
    };

    const onchangeImageUpload = (e) => {
        const { files } = e.target;
        const uploadFile = files[0];

        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => setImgUrl(reader.result);
    };

    return (
        <div>
            <div>
                <h1>개인정보 수정</h1>
                <p>프로필 사진</p>
                <img src={imgUrl} alt="빈캔" />
                <input type="file" onChange={onchangeImageUpload} />
                <button>사진업로드</button>
                <button>사진 제거</button>
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
                <button onClick={() => navigate("/Mypage")}>취소</button>
            </div>
        </div>
    );
};

export default MyInfo;