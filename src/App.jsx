import { createContext, useEffect, useState } from "react";
// import "./reset.css";
import "./normalize.css";
import Router from "./Shared/Router";
import { supabase } from "./supabase";
import styled from "styled-components";
export const PostsContext = createContext();

function App() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        getDocument();
        getUser();
    }, []);

    const getDocument = async () => {
        let { data, error } = await supabase.from("posts").select("*");
        if (error) console.log(error);

        setPosts([...data]);
    };

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data);
    };

    return (
        <>
            <PostsContext.Provider value={{ posts, setPosts, user, setUser }}>
                <Router />
            </PostsContext.Provider>
        </>
    );
}

export default App;
