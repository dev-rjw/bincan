import { createContext, useState } from "react";
// import "./reset.css";
import "./normalize.css";
import Router from "./Shared/Router";
export const PostsContext = createContext();

function App() {
    const [posts, setPosts] = useState([]);
    return (
        <>
            <PostsContext.Provider value={{ posts, setPosts }}>
                <Router />
            </PostsContext.Provider>
        </>
    );
}

export default App;
