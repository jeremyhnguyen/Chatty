import { Outlet } from "react-router-dom";
import { ConnectionManager } from "./ConnectionManager";
import { ConnectionState } from "./ConnectionState";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { ThemeIndicator } from "./ThemeIndicator";

export function NavBar() {
  const { theme, setTheme } = useContext(AppContext);

  function handleSetTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <>
      <div className="height-[4rem] sticky left-0 right-0 top-0 flex items-center justify-between border-b border-b-[#e3e3e3] bg-[#f7f7f7] p-[0.5rem] shadow-sm shadow-[#e8e8e8] dark:border-b-black dark:bg-[#242526] dark:shadow-md dark:shadow-[#090909]">
        <ConnectionManager />
        <div className="flex justify-center gap-0.5 lg:ml-[5%]">
          <h1 className="title text-[1.8em] leading-tight">Whispurr</h1>
          <span className="ml-0.5 w-[8%] min-w-[27px] self-center">
            <img
              src={
                theme === "light"
                  ? "/images/logo -light mode.png"
                  : "/images/logo -dark mode.png"
              }
            ></img>
          </span>
        </div>
        <ConnectionState />
        <div className="absolute right-4 top-[3.2rem]">
          <button onClick={handleSetTheme}>
            <ThemeIndicator />
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}
