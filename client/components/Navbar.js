import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <nav className="full-navbar">
    <div className="mainNav">
      <Link to="/home">
        <h1>hearth</h1>
      </Link>
      <Link to="/products">Products</Link>
    </div>
    <div className="sideNav">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/cart">
            <ShoppingCartIcon fontSize="small" />
          </Link>
          <Link to="#" onClick={handleClick}>
            Log Out
          </Link>
          {isAdmin ? (<Link to = "/users">Users</Link>) : ("")}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/cart/guest">
            <ShoppingCartIcon fontSize="medium" />
          </Link>
          <div className="dropdown">
            <AccountBoxIcon fontSize='medium' />
            <div className="dropdown-content">
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.is_admin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
