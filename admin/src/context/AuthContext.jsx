import { Children } from "react";
import { createContext } from "react";

// eslint-disable-next-line
export const AuthDataContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:5000";

  let values = { serverUrl };

  return (
    <AuthDataContext.Provider value={values}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthContextProvider;
