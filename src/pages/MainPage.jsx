import React, { useEffect, useState } from "react";
import InputWindow from "../components/InputWindow";
import DocumentList from "../components/DocumentList";
import { supabase } from "../supabase";
import LogOut from "../components/LogOut";

function MainPage() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserData();
    });

    const getUserData = async () => {
        const { data } = await supabase.auth.getUser();
        setUserData(data);
        return data;
    };

    return (
        <>
            <LogOut />
            {userData.user !== null ? <InputWindow /> : ""}
            <DocumentList />
        </>
    );
}

export default MainPage;
