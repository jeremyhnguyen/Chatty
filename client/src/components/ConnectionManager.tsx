type Props = {
  onConnection: (toConnect: boolean) => void;
};

export function ConnectionManager({ onConnection }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <button className="w-24 rounded-3xl" onClick={() => onConnection(true)}>
        Connect
      </button>
      <button
        className="w-24 rounded-3xl bg-[#de3214]"
        onClick={() => onConnection(false)}
      >
        Disconnect
      </button>
    </div>
  );
}
