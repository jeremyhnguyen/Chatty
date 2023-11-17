import { BiSolidSend } from "react-icons/bi";

export function Chat() {
  return (
    <div>
      <ChatLogs />
      <ChatInput />
    </div>
  );
}

function ChatInput() {
  return (
    <div>
      <form id="form" action="" className="flex gap-2">
        <input id="input" autoComplete="off" placeholder="Message" />{" "}
        <button>
          <BiSolidSend />
        </button>
      </form>
    </div>
  );
}

function ChatLogs() {
  return (
    <div>
      <ul id="messages">
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc. Pretium viverra
          suspendisse potenti nullam. Sed lectus vestibulum mattis ullamcorper
          velit sed ullamcorper morbi tincidunt. Dignissim diam quis enim
          lobortis scelerisque fermentum dui faucibus in. Odio pellentesque diam
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc. Pretium viverra
          suspendisse potenti nullam. Sed lectus vestibulum mattis ullamcorper
          velit sed ullamcorper morbi tincidunt. Dignissim diam quis enim
          lobortis scelerisque fermentum dui faucibus in. Odio pellentesque diam
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc. Pretium viverra
          suspendisse potenti nullam. Sed lectus vestibulum mattis ullamcorper
          velit sed ullamcorper morbi tincidunt. Dignissim diam quis enim
          lobortis scelerisque fermentum dui faucibus in. Odio pellentesque diam
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc. Pretium viverra
          suspendisse potenti nullam. Sed lectus vestibulum mattis ullamcorper
          velit sed ullamcorper morbi tincidunt. Dignissim diam quis enim
          lobortis scelerisque fermentum dui faucibus in. Odio pellentesque diam
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc. Pretium viverra
          suspendisse potenti nullam. Sed lectus vestibulum mattis ullamcorper
          velit sed ullamcorper morbi tincidunt. Dignissim diam quis enim
          lobortis scelerisque fermentum dui faucibus in. Odio pellentesque diam
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc. Pretium viverra
          suspendisse potenti nullam. Sed lectus vestibulum mattis ullamcorper
          velit sed ullamcorper morbi tincidunt. Dignissim diam quis enim
          lobortis scelerisque fermentum dui faucibus in. Odio pellentesque diam{" "}
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          lobortis elementum nibh tellus molestie nunc. Pretium viverra
          suspendisse potenti nullam. Sed lectus vestibulum mattis ullamcorper
          velit sed ullamcorper morbi tincidunt. Dignissim diam quis enim
          lobortis scelerisque fermentum dui faucibus in. Odio pellentesque diam
        </li>
      </ul>
    </div>
  );
}
