import { FaBars } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { ConnectionManager } from "./ConnectionManager";
import { ConnectionState } from "./ConnectionState";
import { useState } from "react";
import { HiOutlineCog8Tooth } from "react-icons/hi2";

export function NavBar() {
  return (
    <>
      <div className="height-[4rem] left-0 right-0 top-0 flex items-center justify-between border-b border-b-black bg-[#252526] p-[0.5rem]">
        <AppDrawer />
        <div className="flex justify-center gap-0.5 lg:ml-[5%]">
          <h1 className="title">Whispurr</h1>
          <span className="ml-0.5 w-[8%] text-2xl">
            <img src="/images/logo -dark mode.png"></img>
          </span>
        </div>
        <FaBars size={18} className="cursor-pointer" />
      </div>
      <Outlet />
    </>
  );
}

function AppDrawer() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function handleSettingClick() {
    setIsSettingsOpen(!isSettingsOpen);
  }

  return (
    // hidden class for settings
    <>
      <HiOutlineCog8Tooth
        size={22}
        onClick={handleSettingClick}
        className="cursor-pointer"
      />
      <div className="absolute z-50 hidden w-60">
        <div className={`bg-white ${isSettingsOpen ? " " : ""}`}>
          <h2 className="m-1">Settings</h2>
          <ConnectionState />
          <ConnectionManager />
        </div>
      </div>
    </>
  );
}
