import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate } from "react-router-dom";
import MyPage from "./MyPage";
import styled from "styled-components";

const MyInfo = () => {
    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState("");
    const [nickName, setNickName] = useState("");
    const [intro, setIntro] = useState("");

    const { user } = useContext(PostsContext);

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

    return (
        <div>
            <div>
                <h1>개인정보 수정</h1>
                <p>프로필 사진</p>
                <img src={imgUrl} alt="" width="50%" />
                <StyledimgInput type="file" onChange={onchangeImageUpload} />

                <p>이메일</p>
                {user && <StyledInput type="text" value={user?.user.email} disabled />}

                <p>닉네임</p>
                <StyledInput
                    type="text"
                    value={nickName}
                    onChange={(e) => {
                        setNickName(e.target.value);
                    }}
                />
                <p>자기소개</p>
                <StyledInput
                    type="text"
                    value={intro}
                    onChange={(e) => {
                        setIntro(e.target.value);
                    }}
                />
            </div>

            <div>
                <StyledyellowBtn onClick={updateUserData}>수정하기</StyledyellowBtn>
                <StyledyellowBtn
                    onClick={() => {
                        navigate(`/mypage?id=${user.user.id}`);
                    }}
                >
                    취소
                </StyledyellowBtn>
            </div>
        </div>
    );
};

export default MyInfo;

const StyledyellowBtn = styled.button`
    width: 15%;
    height: 35px;
    background-color: #edb432;
    color: white;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #f6e6c2;
    }
`;

const StyledInput = styled.input`
    width: 500px;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: #f6e6c2;

    &:focus {
        background-color: #edb432;
    }
`;

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
