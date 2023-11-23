import { Outlet } from "react-router-dom";
import { ConnectionManager } from "./ConnectionManager";
import { ConnectionState } from "./ConnectionState";

export function NavBar() {
  return (
    <>
      <div className="height-[4rem] sticky left-0 right-0 top-0 flex items-center justify-between border-b border-b-black bg-[#252526] p-[0.5rem] shadow-md shadow-[#090909]">
        <AppDrawer />
        <div className="flex justify-center gap-0.5 lg:ml-[5%]">
          <h1 className="title">Whispurr</h1>
          <span className="ml-0.5 w-[8%] min-w-[27px]">
            <img src="/images/logo -dark mode.png"></img>
          </span>
        </div>
        <ConnectionState />
      </div>
      <Outlet />
    </>
  );
}

function AppDrawer() {
  return (
    <>
      <ConnectionManager />
    </>
  );
}
