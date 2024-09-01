import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from "@chakra-ui/react";
import styled from "styled-components";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";

const ModalColor = styled.div`
    background-color: greenyellow;
`;

function MyModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userData, setUserData] = useState();
    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
        setUserData(data);
        return data;
    };
    console.log(userData);

    useEffect(() => {
        getUserData();
    }, []);
    return (
        <>
            <Button onClick={onOpen}>개인정보 수정</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <div>
                        <p>개인정보 수정</p>
                        <p>프로필 사진</p>
                        <img src="{post.img_url}" alt="빈캔" />
                        <button>사진업로드</button>
                        <button>사진 제거</button>
                        <p>이메일</p>
                        <input type="text" />
                        <p>닉네임</p>
                        <input type="text" />
                        <p>자기소개</p>
                        <input type="text" />
                    </div>

                    <ModalFooter>
                        <Button>수정하기</Button>
                        <Button onClick={onClose}>취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default MyModal;
