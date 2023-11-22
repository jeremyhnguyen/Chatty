import { createContext } from "react";
import { User, Auth } from "../api";

type ContextProps = {
  isConnected: boolean;
  handleConnections: (toConnect: boolean) => void;
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (auth: Auth) => void;
  handleSignOut: () => void;
};

export const AppContext = createContext<ContextProps>({
  isConnected: false,
  handleConnections: () => undefined,
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
});
