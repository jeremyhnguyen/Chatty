import { BiSolidSend } from "react-icons/bi";
import { useState, useEffect } from "react";
// import { socket } from "../socket";
import { io, Socket } from "socket.io-client";

type Log = {
  message: string;
  dateTime: string;
};

export function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [input, setInput] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newSocket = io();

    setSocket(newSocket);

    newSocket.on("chat message", (log: string) => {
      const dateTime = getDateAndTime();
      const newLog: Log = {
        message: log,
        dateTime: `${dateTime.date} at ${dateTime.time}`,
      };
      setLogs((prevLogs) => [...prevLogs, newLog]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && socket) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  function getDateAndTime() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")}${ampm}`;

    const today: string = new Date().toLocaleDateString();
    const showDate: boolean = today !== formattedDate;

    return {
      date: showDate ? formattedDate : "",
      time: formattedTime,
    };
  }

  return (
    <>
      <ul className="m-0 flex w-full list-none flex-col p-0 text-left">
        {logs.map((log, index) => (
          <li key={index} className="flex flex-col">
            <h1>
              <span className="text-sm font-bold">User</span>
              <span className="text-[8px] text-[#8d8d8d]">{log.dateTime}</span>
            </h1>
            <div>
              <p className="break-words text-sm text-[#e5e5e5]">
                {log.message}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit} className="flex gap-2">
        <input
          id="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message"
          autoComplete="off"
        />
        <button type="submit" className="bg-[#5D65FE]">
          <BiSolidSend />
        </button>
      </form>
    </>
  );
}

/* button disabled={isLoading} may need this to stop new inputs if load is slow*/
