import { BiSolidSend } from "react-icons/bi";
import {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { AppContext } from "./AppContext";
import { io, Socket } from "socket.io-client";

type Log = {
  username: string;
  messageId: number;
  body: string;
  sentAt: string;
  isGif: boolean;
};
import { MdOutlineGifBox } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";

export function Chat() {
  const [socket, setSocket] = useState<Socket>();
  const [logs, setLogs] = useState<Log[]>([]);
  const [input, setInput] = useState("");
  const { isConnected, user } = useContext(AppContext);
  const [gifs, setGifs] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const lastChatRef = useRef<HTMLLIElement>(null);

  const [query, setQuery] = useState("");

  async function handleGetTrending() {
    if (isOpen) {
      setIsOpen(false);
      setQuery("");
      return;
    }

    try {
      setIsOpen(true);
      const res = await fetch("/api/gifs/trending");
      if (!res.ok) throw new Error(`failed to get gifs: ${res.status}`);
      const gifs = await res.json();
      setGifs(gifs);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleGifSearch() {
    try {
      const res = await fetch(`/api/gifs/search?q=${query}`);
      if (!res.ok) throw new Error("wtf just happened");
      const gifs = await res.json();
      setGifs(gifs);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    fetchMessages();
    newSocket.on("chat message", () => {
      fetchMessages();
      setInput("");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (lastChatRef.current) {
      lastChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useLayoutEffect(() => {
    if (lastChatRef.current) {
      lastChatRef.current.scrollIntoView(false);
    }
  }, [logs]);

  async function fetchMessages() {
    try {
      const response = await fetch("/api/messageLog");
      if (!response.ok) throw new Error(`fetch error:, ${response.status}`);
      const messageLog = await response.json();
      setLogs(messageLog);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ input, socket, isConnected });
    if (input && socket && isConnected) {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.userId,
          body: input,
          isGif: false,
        }),
      });
      socket.emit("chat message", input);
    }
  };

  async function handleGifClick(gifUrl: string) {
    if (!socket || !isConnected) return;

    console.log("clicked");
    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.userId,
        body: gifUrl,
        isGif: true,
      }),
    });
    setIsOpen(false);
    setGifs(undefined);
    setQuery("");
    socket.emit("chat message", gifUrl);
  }

  function formatTimeStamp(timezonetz) {
    const messageDate = new Date(timezonetz);
    const currentDate = new Date();

    const isSameDay = messageDate.getDate() === currentDate.getDate();
    const isYesterday = messageDate.getDate() === currentDate.getDate() - 1;

    if (isSameDay) {
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(messageDate);
      return `Today at ${formattedTime}`;
    } else if (isYesterday) {
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(messageDate);
      return `Yesterday at ${formattedTime}`;
    } else {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(messageDate);
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(messageDate);
      return `${formattedDate} at ${formattedTime}`;
    }
  }

  return (
    <>
      <div className="overflow-y-scroll bg-[#f7f7f7] dark:bg-[#242526]">
        <ul
          className="mb-4 flex w-full list-none flex-col pb-12 pl-6 pt-2 text-left text-blue-400 dark:text-blue-200"
          ref={chatContainerRef}
        >
          {logs.map((log, index) => (
            <li
              key={index}
              className="mr-5 flex flex-col px-[0.2rem] py-[0.5rem]"
              ref={logs.length - 1 === index ? lastChatRef : null}
            >
              <h1 className="leading-tight">
                <span className="text-sm font-bold">
                  {log?.username ?? "Guest"}
                </span>
                <span className="ml-1 text-[8px] text-[#8d8d8d]">
                  {formatTimeStamp(log.sentAt)}
                </span>
              </h1>
              <div>
                {!log.isGif ? (
                  <p className="break-words text-sm text-black dark:text-[#e5e5e5]">
                    {log.body}
                  </p>
                ) : (
                  <img
                    src={log.body}
                    className="mt-2 max-h-[10rem] rounded-md"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form
        id="form"
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 flex flex-col gap-2 bg-[#f7f7f7] dark:bg-[#252526]"
      >
        <section className="flex h-[3rem] w-full items-center gap-x-2 p-1.5">
          <div className="flex h-full w-full items-center rounded-lg bg-white pl-4 pr-2 focus-within:ring-2 focus-within:ring-[#666666] dark:bg-[#333333]">
            <input
              id="input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message"
              autoComplete="off"
              className="w-full bg-transparent outline-none"
            />
            <div onClick={handleGetTrending}>
              <MdOutlineGifBox className="h-6 w-6 transition duration-500 ease-in-out hover:cursor-pointer hover:text-green-400" />
            </div>
          </div>
          <button
            type="submit"
            className="flex h-full w-10 items-center justify-center rounded-md border border-solid border-transparent bg-[#6ba9ff] text-white transition duration-300 ease-in-out hover:border-[#fff] hover:bg-[#5b94e3] dark:bg-[#3d81e0] dark:hover:bg-[#136eed]"
            disabled={!isConnected}
          >
            <BiSolidSend />
          </button>
        </section>
        {isOpen && (
          <section className="flex h-[30rem] w-full flex-col items-center border-t-2 border-[#e7e7e7] bg-[#f7f7f7] pt-2 dark:border-black dark:bg-[#252526]">
            <div className="flex min-h-[3rem] w-full items-center gap-x-2 p-1.5">
              <input
                className="m-0.5 h-full grow rounded-lg bg-[f7f7f7] pl-3 outline-none focus:ring-2 focus:ring-[#666666] dark:bg-[#333333]"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <button
                className="flex h-full w-9 items-center justify-center rounded-md border border-solid border-transparent bg-[#6ba9ff] text-white transition duration-300 ease-in-out hover:border-[#fff] hover:bg-[#5b94e3] dark:bg-[#3d81e0] dark:hover:bg-[#136eed]"
                onClick={handleGifSearch}
                type="button"
              >
                <FaMagnifyingGlass />
              </button>
            </div>
            <ul className="mt-2 flex flex-wrap items-center overflow-y-scroll border-t-2 border-[#e7e7e7] px-2 pt-4 dark:border-black">
              {gifs &&
                gifs.data.map((n) => (
                  <li key={n.id} className="basis-1/2 md:basis-1/3">
                    <img
                      src={n.images.downsized_medium.url}
                      className="w-full"
                      onClick={() =>
                        handleGifClick(n.images.downsized_medium.url)
                      }
                    />
                  </li>
                ))}
            </ul>
          </section>
        )}
      </form>
    </>
  );
}
