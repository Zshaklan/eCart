import { createContext } from "react";

// eslint-disable-next-line
export const AuthDataContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:5000";

  const value = { serverUrl };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthContextProvider;
