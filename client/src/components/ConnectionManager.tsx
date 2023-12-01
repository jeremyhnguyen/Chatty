import { useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

export function ConnectionManager() {
  const { handleConnections } = useContext(AppContext);
  const navigate = useNavigate();

  function handleDisconnect() {
    handleConnections(false);
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        className="ml-4 w-20 rounded-md border border-[#fff] border-transparent bg-red-400 py-1 text-xs transition duration-300 ease-in-out hover:border-[#fff] hover:bg-[#f24a38] dark:bg-[#de3214] dark:hover:bg-[#ad2710]"
        onClick={handleDisconnect}
      >
        Disconnect
      </button>
    </div>
  );
}
