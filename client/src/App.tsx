import { useEffect, useState } from "react";
import "./App.css";
import { Chat } from "./components/Chat";
import io from "socket.io-client";
// import { socket } from "./socket";

const socket = io("http://localhost:8081");

// socket.on("connect", () => {
//   console.log("Connected to server");
// });

// socket.on("chat message", (msg) => {
//   console.log("Received message:", msg);
// });

socket.emit("chat message", "Hello, socket is working!");

export default function App() {
  //   const [isConnected, setIsConnected] = useState(socket.connected);
  //   const [fooEvents, setFooEvents] = useState([]);

  //   useEffect(() => {
  //     function onConnect() {
  //       setIsConnected(true);
  //     }

  //     function onDisconnect() {
  //       setIsConnected(false);
  //     }

  //     function onFooEvent(value) {
  //       setFooEvents((previous) => [...previous, value]);
  //     }

  //     socket.on("connect", onConnect);
  //     socket.on("disconnect", onDisconnect);
  //     socket.on("foo", onFooEvent);

  //     return () => {
  //       socket.off("connect", onConnect);
  //       socket.off("disconnect", onDisconnect);
  //       socket.off("foo", onFooEvent);
  //     };
  //   }, []);

  return (
    <div>
      <div id="header-div">
        <h1 className="title">Chat</h1>
      </div>
      <div className="m-10 flex flex-col">
        <Chat />
      </div>
    </div>
  );
}
