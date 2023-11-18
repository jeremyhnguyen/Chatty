import { BiSolidSend } from "react-icons/bi";
import { useState } from "react";
import { socket } from "../socket";

export function Chat() {
  return (
    <>
      <ChatLogs />
      <ChatInput />
    </>
  );
}

function ChatInput() {
  const [value, setValue] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setisLoading(true);

    socket.timeout(5000).emit("create-something", value, () => {
      setisLoading(false);
    });
  }
  return (
    <div>
      <form id="form" onSubmit={onSubmit} className="flex gap-2">
        <input
          id="input"
          autoComplete="off"
          onChange={(event) => setValue(event.target.value)}
          placeholder="Message"
        />
        <button type="submit" disabled={isLoading} className="bg-[#5D65FE]">
          <BiSolidSend />
        </button>
      </form>
    </div>
  );
}

function ChatLogs() {
  type DateTime = {
    date: string;
    time: string;
  };

  function getDateAndTime(): DateTime {
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

    if (showDate) {
      return {
        date: formattedDate,
        time: formattedTime,
      };
    } else {
      return {
        date: "",
        time: formattedTime,
      };
    }
  }

  return (
    <ul className="m-0 flex list-none flex-col p-0 text-left">
      <li className="flex flex-col">
        <h1>
          <span className="text-sm">User</span>
          <span className="text-xs">
            {`${getDateAndTime().date} at ${getDateAndTime().time}`}
          </span>
        </h1>
        <p className="text-sm text-[#e5e5e5]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc. Pretium viverra
          suspendisse potenti nullam. Sed lectus vestibulum mattis ullamcorper
          velit sed ullamcorper morbi tincidunt. Dignissim diam quis enim
          lobortis scelerisque fermentum dui faucibus in. Odio pellentesque diam
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc.
        </p>
      </li>
    </ul>
  );
}
