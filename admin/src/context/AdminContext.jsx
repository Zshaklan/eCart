import { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./AuthContext.jsx";
import axios from "axios";

// eslint-disable-next-line
export const AdminDataContext = createContext({});

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  useEffect(() => {
    getAdmin();
  }, []);

  async function getAdmin() {
    try {
      const response = await axios.get(`${serverUrl}/api/user/getadmin`, {
        withCredentials: true,
      });
      setAdminData(response.data.admin);
      console.log(response.data.admin);
    } catch (error) {
      setAdminData(null);
      console.log("Admin Error ", error);
    }
  }

  let values = { adminData, setAdminData, getAdmin };

  return (
    <AdminDataContext.Provider value={values}>
      {children}
    </AdminDataContext.Provider>
  );
};

export default AdminContextProvider;
