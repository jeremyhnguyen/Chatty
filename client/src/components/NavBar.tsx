import { FaBars } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { ConnectionManager } from "./ConnectionManager";
import { ConnectionState } from "./ConnectionState";

export function NavBar() {
  return (
    <>
      <div id="header-div">
        <AppDrawer />
        <div className="flex justify-center gap-0.5 lg:ml-[5%]">
          <h1 className="title">Chatty</h1>
          <span className="ml-0.5 w-[8%] text-2xl">
            <img src="/images/logo -dark mode.png"></img>
          </span>
        </div>
      </div>
      <Outlet />
    </>
  );
}

function AppDrawer() {
  return (
    <div className="absolute left-0 top-0 m-4">
      <FaBars size={18} />
      <div className="m-10 flex flex-col">
        <ConnectionState />
        <ConnectionManager />
      </div>
    </div>
  );
}
