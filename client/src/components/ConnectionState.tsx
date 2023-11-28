import { useContext } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { AppContext } from "./AppContext";

export function ConnectionState() {
  const { isConnected } = useContext(AppContext);

  return (
    <div className="mr-4 flex items-center justify-center gap-1">
      <p className="text-center text-xs text-[#8d8d8d]">Connection Status:</p>
      <div
        className={`mb-1 mt-[0.2rem] animate-pulse rounded-full shadow-[.01px_.01px_5px_0.1px] ${
          isConnected
            ? "shadow-green-600 dark:shadow-green-400"
            : "shadow-red-600"
        }`}
      >
        <GrStatusGoodSmall
          className={
            isConnected ? "text-green-600 dark:text-green-400" : "text-red-600"
          }
          size={6}
        />
      </div>
    </div>
  );
}
