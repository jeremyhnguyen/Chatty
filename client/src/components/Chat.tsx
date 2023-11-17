import { BiSolidSend } from "react-icons/bi";

export function Chat() {
  return (
    <div>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autoComplete="off" />{" "}
        <button>
          <BiSolidSend />
        </button>
      </form>
    </div>
  );
}
