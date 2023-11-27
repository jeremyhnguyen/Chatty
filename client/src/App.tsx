import { useEffect, useLayoutEffect, useState } from "react"; // add useContext import
import { Chat } from "./components/Chat";
import io from "socket.io-client";
import { NavBar } from "./components/NavBar";
import { LandingPage } from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import { AppContext, type Theme } from "./components/AppContext";
import { User, Auth } from "./api";
// import { socket } from "./socket";
// import { Events } from "./components/Events";

const socket = io();

const tokenKey = "react-context-jwt";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User>();
  const [theme, setTheme] = useState<Theme>("dark"); // for light/dark mode

  // useContext() {} //need this to serve logo images
  useLayoutEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function handleSignIn(auth: Auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setIsConnected(false);
    setUser(undefined);
    setToken(undefined);
  }

  //
  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  function handleConnections(toConnect: boolean): void {
    if (toConnect) {
      socket.connect();
      setIsConnected(true);
    } else {
      socket.disconnect();
      handleSignOut();
    }
  }

  const contextValues = {
    theme,
    setTheme,
    isConnected,
    handleConnections,
    user,
    token,
    handleSignIn,
    handleSignOut,
  };

  return (
    <AppContext.Provider value={contextValues}>
      <div className="min-w-screen flex flex-col overscroll-none bg-[#f7f7f7] text-black dark:bg-[#242526] dark:text-white">
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/" element={<NavBar />}>
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
