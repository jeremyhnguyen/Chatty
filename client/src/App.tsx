import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

export default function App() {
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    async function readServerData() {
      const resp = await fetch("/api/hello");
      const data = await resp.json();

      console.log("Data from server:", data);

      setServerData(data.message);
    }

    readServerData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-red-400">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer"></a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{serverData}</h1>
    </>
  );
}
