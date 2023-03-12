import React from "react";
import "./index.css";

import { BiUserCircle } from "react-icons/bi";
import { TbShoppingCartPlus } from "react-icons/tb";
import { GlobalContexts } from "../reducer/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  let { state, dispatch } = useContext(GlobalContexts);

  const logoutHandler = async () => {
    try {
      let response = await axios.post(
        `${state.baseUrl}/logout`,
        {},
        { withCredentials: true }
      );
      console.log("response :", response.data);

      dispatch({ type: "USER_LOGOUT" });
    } catch (e) {
      console.log("error in api call", e);
    }
  };

  return (
    <div className="nav">
      <div>Saylani Welfare Online Shopping Application</div>

      <nav className="navbar-component">
        <ul>
          {state.isLogin === true ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/cart">
                  <TbShoppingCartPlus size={20} className="icon" />
                </Link>
              </li>
              <p className="cart_count">{state?.cart?.length}</p>
              {(state.user.role === "sale" || state.user.role === "admin") && (
                <li>
                  <Link to="/addProduct">Add Product</Link>
                </li>
              )}
               {(state.user.role === "admin") && (
                <li>
                  <Link to="/Users">Users</Link>
                </li>
              )}
              <li>
                <Link className="icon" to="/profile">
                  <BiUserCircle size={20} />
                </Link>
              </li>

              <li>
                <Link to="/login" onClick={logoutHandler}>
                  logout
                </Link>
              </li>
            </>
          ) : null}

          {state.isLogin === false ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cart">
                  <TbShoppingCartPlus size={20} className="icon" />
                </Link>
              </li>
              <p className="cart_count">{state?.cart?.length}</p>

              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signUp">SignUp</Link>
              </li>
            </>
          ) : null}

          {state.isLogin === null ? <div>Loading....</div> : null}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
