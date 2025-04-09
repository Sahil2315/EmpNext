import { createContext, ReactNode, useState } from "react";
import { empDefault, employeeTS } from "../types";

export type empState ={
    user: employeeTS,
    resetUser: (user: employeeTS) => void
}

export const empContext = createContext<empState>({
    user: empDefault,
    resetUser: (user: employeeTS) => {return}
})

export function UserProvider({children}: {children: ReactNode}){
    const [user, resetUser] = useState<employeeTS>(empDefault)
    return (
        <empContext.Provider value={{user, resetUser}}>
            {children}
        </empContext.Provider>
    )
}