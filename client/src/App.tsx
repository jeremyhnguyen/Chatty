import { useEffect, useLayoutEffect, useState } from "react";
import { Chat } from "./components/Chat";
import { io } from "socket.io-client";
import { NavBar } from "./components/NavBar";
import { LandingPage } from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import { AppContext, type Theme } from "./components/AppContext";
import { User, Auth } from "./api";

const socket = io("http://chatty-dev.us-west-2.elasticbeanstalk.com/chat");

const tokenKey = "react-context-jwt";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User>();
  const [theme, setTheme] = useState<Theme>("dark");

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

    const connection = localStorage.getItem("connection");
    if (connection) {
      setIsConnected(connection === "true" ? true : false);
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
    setTheme("dark");
  }

  function onConnect() {
    setIsConnected(true);
    localStorage.setItem("connection", "true");
  }

  function onDisconnect() {
    setIsConnected(false);
    localStorage.setItem("connection", "false");
  }

  function handleConnections(toConnect: boolean): void {
    if (toConnect) {
      socket.connect();
      setIsConnected(true);
      localStorage.setItem("connection", "true");
    } else {
      socket.disconnect();
      localStorage.setItem("connection", "false");

      handleSignOut();
    }
  }

  const contextValues = {
    theme,
    setTheme,
    socket,
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
