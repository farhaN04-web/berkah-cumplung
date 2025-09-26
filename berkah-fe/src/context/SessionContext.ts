import { createContext } from "react";
import { Session } from "@/types";

export interface SessionContextType {
  session: Session | null;
  sessionLoading: boolean;
  signIn: (sessionData: Session) => Promise<void>;
  signOut: () => Promise<void>;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);
