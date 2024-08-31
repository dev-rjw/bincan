import styled from "styled-components";
import MyModal from "./../components/MyModal";

const Dashboard = styled.div`
    background-color: greenyellow;
`;

function MyPage() {
    return (
        <>
            <Dashboard>
                <img src="{post.img_url}" alt="" />
                <h2>닉네임</h2>
                <p>능이버섯</p>
                <h2>이메일</h2>
                <p>4tuna@bincan.com</p>
                <h2>자기소개</h2>
                <p>나는 능이버섯이다 나는 능이 할수없다..</p>
                <MyModal />
            </Dashboard>
        </>
    );
}
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     useDisclosure,
//     Button
// } from "@chakra-ui/react";

// function MyPage() {
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     return (
//         <>
//             <Button onClick={onOpen}>Trigger modal</Button>

//             <Modal onClose={onClose} isOpen={isOpen} isCentered>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>정보수정</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>인풋</ModalBody>
//                     <ModalFooter>
//                         <Button onClick={onClose}>Close</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// }
export default MyPage;
