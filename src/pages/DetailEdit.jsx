import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../supabase";
import { PostsContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";

const DetailEdit = () => {
    const [title, setTitle] = useState("");
    const [money, setMoney] = useState("");
    const [context, setContext] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const [post, setPost] = useState("");

    const { posts, setPosts, user, setUser } = useContext(PostsContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const postsId = searchParams.get("id");

    const onchangeImageUpload = (e) => {
        const { files } = e.target;
        const uploadFile = files[0];

        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => setImgUrl(reader.result);
    };

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    useEffect(() => {
        getUser();
        const filteredPost = posts?.filter((data) => {
            return data.id === Number(postsId);
        });

        if (filteredPost.length > 0) {
            const post = filteredPost[0];
            setTitle(post.title || "");
            setMoney(post.money || "");
            setContext(post.context || "");
            setImgUrl(post.imgUrl || "");
        }
    }, []);

    const editPost = async (e) => {
        e.preventDefault();

        if (!title || !money || !context) {
            alert("빈칸을 채워~");
            return;
        }

        // 현재 사용자의 ID를 가져옴
        const userId = user.user.id;
        if (!userId) {
            console.error("유저 아이디가 없습니다");
            return;
        }

        const { data, error } = await supabase
            .from("posts")
            .update({ title, img_url: imgUrl, money, context })
            .eq("id", postsId)
            .eq("user_id", userId)
            .select();

        if (error) {
            console.log("게시물 업데이트 오류", error);
            return;
        }

        const updatedPost = data;

        setPost(updatedPost);

        navigate(`/detail?id=${postsId}`);
    };

    return (
        <Window>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input type="text" value={money} onChange={(e) => setMoney(e.target.value)} />
            <TextArea value={context} onChange={(e) => setContext(e.target.value)} />
            <img src={imgUrl} width="30%" />
            <input type="file" accept="image/*" onChange={onchangeImageUpload}></input>
            <Button onClick={editPost}>수정하기</Button>
            <Button
                onClick={() => {
                    navigate(`/detail?id=${postsId}`);
                }}
            >
                취소
            </Button>
        </Window>
    );
};

export default DetailEdit;

const Window = styled.div`
    width: 100%;
    background-color: #676767;
    display: flex;
    flex-direction: column;
    place-items: center;
    text-align: center;
    border-radius: 10px;
`;

const Input = styled.input`
    width: 40%;
    height: 30px;
    background-color: #f1d594;
`;

const TextArea = styled.textarea`
    width: 40%;
    height: 60px;
    background-color: #f1d594;
`;

const Button = styled.button`
    width: 15%;
    height: 35px;
    background-color: #edb432;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;
