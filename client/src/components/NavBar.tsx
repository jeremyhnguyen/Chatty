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
