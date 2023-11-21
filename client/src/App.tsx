import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Chat } from "./components/Chat";
import io from "socket.io-client";
import { ConnectionManager } from "./components/ConnectionManager";
import { ConnectionState } from "./components/ConnectionState";
import { NavBar } from "./components/NavBar";
import { LandingPage } from "./components/LandingPage";
// import { socket } from "./socket";
// import { Events } from "./components/Events";

const socket = io("http://localhost:8081");

type Theme = "light" | "dark";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);
  const [theme, setTheme] = useState<Theme>("light");

  // useContext() {} // need this
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

  return (
    <div className="dark w-screen">
      <NavBar />
      <div className="m-10 flex flex-col">
        <ConnectionState isConnected={isConnected} />
        {/* <Events events={fooEvents} /> */}
        <ConnectionManager onConnection={handleConnections} />
        <Chat />
      </div>
      <LandingPage />
    </div>
  );
}
