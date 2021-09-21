import React, { useState, useEffect } from "react";
import "./header.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../contextAPI/StateProvider";

const Header = () => {
  const history = useHistory();
  const [{ userName }, dispatch] = useStateValue();

  const handleLogout = () => {
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    setTimeout(() => {
      localStorage.clear();
      history.replace("/");
    }, 2000);
  };

  return (
    <div className="header__main">
      <img
        src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
        alt="twitter Icon white on blue"
      />
      <p>{userName}</p>
      <button
        onClick={() => handleLogout()}
        type="button"
        className="btn btn-danger"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
