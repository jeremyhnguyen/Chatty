import { useEffect, useState } from "react"; // add useContext import
import { Chat } from "./components/Chat";
import io from "socket.io-client";
import { NavBar } from "./components/NavBar";
import { LandingPage } from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./components/AppContext";
// import { socket } from "./socket";
// import { Events } from "./components/Events";

const socket = io("http://localhost:8081");

// type Theme = "light" | "dark"; // light/dark mode

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  // const [theme, setTheme] = useState<Theme>("light"); // for light/dark mode

  // useContext() {} //need this to serve logo images
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // function onFooEvent(value) {
    //   setFooEvents((previous) => [...previous, value]);
    // }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      //   socket.off("foo", onFooEvent);
    };
  }, []);

  function handleConnections(toConnect: boolean): void {
    if (toConnect) {
      socket.connect();
      setIsConnected(true);
    } else {
      socket.disconnect();
      setIsConnected(false);
    }
  }

  const contextValues = {
    isConnected,
    handleConnections,
  };

  return (
    <AppContext.Provider value={contextValues}>
      <div className="dark flex h-screen w-screen justify-center overscroll-none">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<LandingPage />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
