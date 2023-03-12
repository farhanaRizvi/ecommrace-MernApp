import React from "react";
import Home from "../component/home";
import Navbar from "../component/navbar";
import AddProduct from "../component/product";
import Login from "../component/login";
import SignUp from "../component/signup";
import Profile from "../component/profile";
import Cart from "../component/cart";

import { useContext } from "react";
import { GlobalContexts } from "../component/reducer/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Users from "../component/users";

const AppRoutes = () => {
  let { state } = useContext(GlobalContexts);

  return (
    <Router>
      <Navbar />
      <Routes>
        {state.isLogin === true ? (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            {(state.user.role === "sale" || state.user.role === "admin") && (
              <Route path="/addproduct" element={<AddProduct />} />
            )}
              {( state.user.role === "admin") && (
            <Route path="/Users" element={<Users />} />
            )}
            <Route path="/" element={<Home />} />

            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : null}

        {state.isLogin === false ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : null}

        {state.isLogin === null ? <>Loading...</> : null}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
