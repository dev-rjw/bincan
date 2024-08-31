import React from "react";
import InputWindow from "../components/InputWindow";
import DocumentList from "../components/DocumentList";
import LogOut from "../components/LogOut";

function MainPage() {
    return (
        <>
            <LogOut />
            <InputWindow />
            <DocumentList />
        </>
    );
}

export default MainPage;
