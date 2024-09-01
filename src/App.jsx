import { createContext, useEffect, useState } from "react";
// import "./reset.css";
import "./normalize.css";
import Router from "./Shared/Router";
import { supabase } from "./supabase";
export const PostsContext = createContext();

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getDocument(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDocument = async () => {
        let { data, error } = await supabase.from("posts").select("*");
        if (error) console.log(error);

        setPosts([...data]);
    };

    return (
        <>
            <PostsContext.Provider value={{ posts, setPosts }}>
                <Router />
            </PostsContext.Provider>
        </>
    );
}

export default App;
