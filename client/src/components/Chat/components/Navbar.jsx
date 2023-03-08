import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../authentication/firebase";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">iCare</span>
      <div className="user">
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
