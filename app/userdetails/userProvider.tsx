import { createContext, ReactNode, useState } from "react";
import { empDefault, employeeTS } from "../types";

export type empState = {
  user: employeeTS;
  resetUser: (user: employeeTS) => void;
};

export const empContext = createContext<empState>({
  user: empDefault,
  resetUser: () => {}, // Provide a default no-op function
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<employeeTS>(empDefault);

  const resetUser = (updatedUser: employeeTS) => {
    setUser(updatedUser);
  };

  return (
    <empContext.Provider value={{ user, resetUser }}>
      {children}
    </empContext.Provider>
  );
}