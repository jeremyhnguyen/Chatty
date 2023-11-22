import { useContext } from "react";
import { AppContext } from "./AppContext";

export function ConnectionManager() {
  const { handleConnections } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <button
        className="w-24 rounded-3xl"
        onClick={() => handleConnections(true)}
      >
        Connect
      </button>
      <button
        className="w-24 rounded-3xl bg-[#de3214]"
        onClick={() => handleConnections(false)}
      >
        Disconnect
      </button>
    </div>
  );
}
