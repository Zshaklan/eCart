import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { UserDataContext } from "../src/context/UserContext.jsx";
import Registration from "./pages/Registration.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import Collections from "./pages/Collections.jsx";
import About from "./pages/About.jsx";

const App = () => {
  const { userData } = useContext(UserDataContext);
  const location = useLocation();

  return (
    <>
      {userData && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />

        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />

        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/collections"
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
