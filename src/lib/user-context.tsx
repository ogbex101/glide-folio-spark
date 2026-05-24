import { createContext, useContext } from "react";

export type PortfolioUser = "daniel" | "joshua";

export interface UserContextValue {
  user: PortfolioUser | null;
  displayName: string;
  firstName: string;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  displayName: "Ogbeifun Daniel Osewe",
  firstName: "Daniel",
});

export function UserProvider({
  user,
  children,
}: {
  user: PortfolioUser | null;
  children: React.ReactNode;
}) {
  const displayName =
    user === "joshua" ? "Ogbeifun Joshua Osewe" : "Ogbeifun Daniel Osewe";
  const firstName = user === "joshua" ? "Joshua" : "Daniel";

  return (
    <UserContext.Provider value={{ user, displayName, firstName }}>
      {children}
    </UserContext.Provider>
  );
}

export function usePortfolioUser() {
  return useContext(UserContext);
}
