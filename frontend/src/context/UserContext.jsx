import { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";

// eslint-disable-next-line
export const UserDataContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    try {
      const response = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(response.data.user);
      console.log(response.data.user);
    } catch (error) {
      setUserData(null);
      console.log("Current User Error ", error);
    }
  }

  let value = { userData, setUserData, getCurrentUser };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;
