import React from "react";
import SiteLogo from "../../../images/boomtown.svg";
import "./styles.css";
import { Link } from "react-router-dom";

const BoomtownLogo = () => {
  return (
    <>
      <Link to="/items">
        <img src={SiteLogo} className="site_Logo" alt="site-logo" />
      </Link>
    </>
  );
};

export default BoomtownLogo;
