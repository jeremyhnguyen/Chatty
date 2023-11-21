import { FaBars } from "react-icons/fa6";
import { BsChat } from "react-icons/bs";

export function NavBar() {
  return (
    <div id="header-div">
      <AppDrawer />
      <div className="flex gap-0.5">
        <h1 className="title">Chatty</h1>
        <BsChat className="ml-0.5 text-2xl" />
      </div>
      <div className="absolute ml-[5.3em] mt-[0.6em] h-[0.3em] w-[0.3em]  rounded-full bg-[#fff] font-[0px]" />
      <div className="absolute ml-[6.2em] mt-[0.6em] h-[0.3em] w-[0.35em] rounded-full bg-[#fff]" />
      <div className="absolute ml-[6.2em] mt-[0.63em] h-[0.28em] w-[0.25em] rounded-full bg-[#242526]" />
      <div className="absolute ml-[5.2em] mt-[0.63em] h-[0.28em] w-[0.25em] rounded-full bg-[#242526]" />
      <div className="absolute ml-[6.1em] mt-[0.68em] h-[0.15em] w-[0.15em] rounded-full bg-[#fff]" />
      <div className="absolute ml-[5.1em] mt-[0.68em] h-[0.15em] w-[0.15em] rounded-full bg-[#fff]" />
    </div>
  );
}

function AppDrawer() {
  return (
    <div className="absolute left-0 top-0 m-4">
      <FaBars size={18} />
    </div>
  );
}
