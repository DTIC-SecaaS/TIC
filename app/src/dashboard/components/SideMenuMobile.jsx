import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import MenuButton from "./MenuButton";
import MenuContent from "./MenuContent";
// import CardAlert from "./CardAlert";
import { optionsUserProfile, getOptionTextByKey } from "../../constants/consts";

function SideMenuMobile({ open, toggleDrawer }) {
  const fullName = "Riley Carter";
  const dividedFullName = fullName.split(" ");
  let initials = " ";

  dividedFullName.length >= 3
    ? (initials = dividedFullName[0].charAt(0) + dividedFullName[2].charAt(0))
    : (initials = dividedFullName[0].charAt(0) + dividedFullName[1].charAt(0));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              title={fullName}
              sx={{ width: 36, height: 36 }}
            >
              {initials}
            </Avatar>
            <Typography component="p" variant="h6">
              {fullName}
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        {/* <CardAlert /> */}
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            {getOptionTextByKey(optionsUserProfile, "logout")}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
