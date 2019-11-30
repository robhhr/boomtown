import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { LOGOUT_MUTATION } from "../../../apollo/queries";
import client from "../../../apollo/index";

const MenuList = () => {
  const expandableMenu = ["Your Profile", "Sign Out"];
  const [menuList, setMenuList] = useState(null);
  const open = Boolean(menuList);
  const handleClick = e => {
    setMenuList(e.currentTarget);
  };
  const handleClose = e => {
    setMenuList(null);
  };
  return (
    <>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="long-menu"
        menuList={menuList}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose}>Your Profile</MenuItem>
        </Link>
        {/* <Mutation mutation={LOGOUT_MUTATION}>
          {
            (LOGOUT_MUTATION = () => (
              <MenuItem onClick={LOGOUT_MUTATION}>Log Out</MenuItem>
            ))
          }
        </Mutation> */}
      </Menu>
    </>
  );
};

export default MenuList;
