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
      {/* <button
        className="w-20 rounded-md bg-[#3d81e0]"
        onClick={() => handleConnections(true)}
      >
        Connect
      </button> */}
      <button
        className="ml-4 w-20 rounded-md bg-[#de3214]"
        onClick={handleDisconnect}
      >
        Disconnect
      </button>
    </div>
  );
}
