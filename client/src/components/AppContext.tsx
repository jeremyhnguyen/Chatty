import { createContext } from "react";

type ContextProps = {
  isConnected: boolean;
  handleConnections: (toConnect: boolean) => void;
};

export const AppContext = createContext<ContextProps>({
  isConnected: false,
  handleConnections: () => undefined,
});
