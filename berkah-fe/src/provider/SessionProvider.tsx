import { type ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Session } from "@/types/session";
import { SessionContext } from "@/context/SessionContext";
import * as jose from "jose";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const getSecretKey = () => {
    return new TextEncoder().encode(
      import.meta.env.VITE_SECRET_KEY || "fallback-secret-key",
    );
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        const token = Cookies.get("APP_SESSION");
        if (token) {
          const { payload } = await jose.jwtVerify(token, getSecretKey(), {
            algorithms: ["HS256"],
          });

          if (payload && payload.session) {
            const sessionData = payload.session as Session;
            setSession(sessionData);
          }
        }
      } catch (error) {
        console.error("Failed to verify session token:", error);
      } finally {
        setSessionLoading(false);
      }
    };

    loadSession();
  }, []);

  const signIn = async (sessionData: Session) => {
    try {
      const token = await new jose.SignJWT({ session: sessionData })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getSecretKey());

      Cookies.set("APP_SESSION", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      setSession(sessionData);
    } catch (error) {
      console.error("Failed to create session token:", error);
    }
  };

  const signOut = async () => {
    Cookies.remove("APP_SESSION");
    setSession(null);

    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  };

  return (
    <SessionContext.Provider
      value={{ session, sessionLoading, signIn, signOut }}
    >
      {children}
    </SessionContext.Provider>
  );
}
