// import { socket } from "../socket";
import { BiSolidSend } from "react-icons/bi";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { io, Socket } from "socket.io-client";

type Log = {
  message: string;
  dateTime: string;
};

export function Chat() {
  const [socket, setSocket] = useState<Socket>();
  const [logs, setLogs] = useState<Log[]>([]);
  const [input, setInput] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const { isConnected, user } = useContext(AppContext);
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    console.log(newSocket); //check the socket ID

    newSocket.on("chat message", (log: string) => {
      const dateTime = getDateAndTime();
      const newLog: Log = {
        message: log,
        dateTime: `${dateTime.date} at ${dateTime.time}`,
      };
      setLogs((prevLogs) => [...prevLogs, newLog]);
      setInput("");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && socket && isConnected) {
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ user: user?.userId, body: input }),
      });
      socket.emit("chat message", input);
      // socket.emit("chat message", { input, userId }); // how to get userId value:object

      // socket.once("chat message", (log: string) => {
      //   console.log("chatted", log);
      //   const dateTime = getDateAndTime();

      //   const newLog: Log = {
      //     message: log,
      //     dateTime: `${dateTime.date} at ${dateTime.time}`,
      //   };
      //   setLogs((prevLogs) => {
      //     console.log("log", logs);
      //     console.log("prevLog", prevLogs);

      //     return [...prevLogs, newLog];
      //   }); // Why?
      //   // setLogs([...logs, newLog]);
      // });
      // setInput("");
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
      <div className="overflow-y-scroll bg-[#f7f7f7] dark:bg-[#242526]">
        <ul className="flex w-full list-none flex-col pb-12 pl-6 pt-2 text-left text-blue-400 dark:text-blue-200">
          {logs.map((log, index) => (
            <li key={index} className="flex flex-col px-[0.2rem] py-[0.5rem]">
              <h1 className="leading-tight">
                <span className="text-sm font-bold">
                  {user?.username ?? "Guest"}
                </span>
                <span className="text-[8px] text-[#8d8d8d]">
                  {log.dateTime}
                </span>
              </h1>
              <div>
                <p className="break-words text-sm text-black dark:text-[#e5e5e5]">
                  {log.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form
        id="form"
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 flex h-[3.4rem] gap-2 bg-slate-400/10 p-1.5 backdrop-blur-sm dark:bg-black/10"
      >
        <input
          id="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message"
          autoComplete="off"
          className="m-0.5 grow rounded-lg bg-[f7f7f7] pl-3 focus:outline-[#666666] dark:bg-[#333333]"
        />
        <button
          type="submit"
          className="flex w-10 items-center justify-center rounded-md border border-solid border-transparent bg-[#6ba9ff] text-white transition duration-300 ease-in-out hover:border-[#fff] hover:bg-[#5b94e3] dark:bg-[#3d81e0] dark:hover:bg-[#136eed]"
          disabled={!isConnected}
        >
          <BiSolidSend />
        </button>
      </form>
    </>
  );
}
