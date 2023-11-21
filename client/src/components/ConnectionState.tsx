import { GrStatusGoodSmall } from "react-icons/gr";

type Props = {
  isConnected: boolean;
};

export function ConnectionState({ isConnected }: Props) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      <p className="text-xs text-[#8d8d8d]">Connection Status:</p>
      <div
        className={`mt-[0.2rem] rounded-full shadow-[.01px_.01px_5px_0.1px] ${
          isConnected ? "shadow-green-600" : "shadow-red-600"
        }`}
      >
        <GrStatusGoodSmall
          className={isConnected ? "p-0 text-green-600" : "text-red-600"}
          size={6}
        />
      </div>
    </div>
  );
}
