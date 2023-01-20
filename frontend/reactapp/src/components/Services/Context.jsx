import { createContext } from "react";

const StoreContext = createContext({
    token: null,
    setToken: () => {},

    loggedName: null,
    setLoggedName: () => {},

    loggedName: null,
    setLoggedName: () => {},

    loggedEmail: null,
    setLoggedEmail: () => {},

    loggedAccess_id: null,
    setLoggedAccess_id: () => {},
    
    loggedId: null,
    setLoggedId: () => {},

    accessPage: null,
    setAccessPage: () => {},
});

export default StoreContext;