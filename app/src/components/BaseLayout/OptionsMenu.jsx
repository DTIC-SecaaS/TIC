import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuButton from "./MenuButton";
import { optionsUserProfile, getOptionTextByKey } from "../../constants/consts";
import { useAuthContext } from "../../auth/AuthProvider";

const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuthContext();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: "10px",
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: "5px -5px",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          {getOptionTextByKey(optionsUserProfile, "profile")}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {getOptionTextByKey(optionsUserProfile, "account")}
        </MenuItem>
        {/* <Divider />
        <MenuItem onClick={handleClose}>Settings</MenuItem> */}
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose(); // Cierra el menú al hacer clic
            logout(); // Llama a la función de logout
          }}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: "6px",
              minWidth: 0,
            },
          }}
        >
          <ListItemText>
            {getOptionTextByKey(optionsUserProfile, "logout")}
          </ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
