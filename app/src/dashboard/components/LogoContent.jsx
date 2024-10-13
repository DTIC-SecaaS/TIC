import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import logo from "../../assets/Logo_DTIC.png";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 75,
  height: 75,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

export default function LogoContent() {
  return (
    <Box
      sx={{
        maxHeight: 60,
        width: 215,
        display: "flex",
        alignItems: "center",
        p: "8px",
        justifyContent: "center",
      }}
    >
      <Avatar title="Secure Scan 360" src={logo} />
    </Box>
  );
}
