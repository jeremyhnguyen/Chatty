// import { useEffect, useState } from "react";
import "./App.css";
import { Chat } from "./components/Chat";
import io from "socket.io-client";

const socket = io("http://localhost:8081");

// socket.on("connect", () => {
//   console.log("Connected to server");
// });

// socket.on("chat message", (msg) => {
//   console.log("Received message:", msg);
// });

socket.emit("chat message", "Hello, socket is working!");

export default function App() {
  return (
    <>
      <h1>Hello</h1>
      <Chat />
    </>
  );
}
