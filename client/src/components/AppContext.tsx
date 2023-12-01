import { createContext } from "react";
import { User, Auth } from "../api";

export type Theme = "light" | "dark";

type ContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isConnected: boolean;
  handleConnections: (toConnect: boolean) => void;
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (auth: Auth) => void;
  handleSignOut: () => void;
};

export const AppContext = createContext<ContextProps>({
  theme: "dark",
  setTheme: () => undefined,
  isConnected: false,
  handleConnections: () => undefined,
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
});
