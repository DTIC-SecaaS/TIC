import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OptionsMenu from "./OptionsMenu";

const UserProfile = () => {
  const fullName = "Riley Carter";
  const email = "riley@email.com";
  const dividedFullName = fullName.split(" ");
  let initials = " ";

  dividedFullName.length >= 3
    ? (initials = dividedFullName[0].charAt(0) + dividedFullName[2].charAt(0))
    : (initials = dividedFullName[0].charAt(0) + dividedFullName[1].charAt(0));

  return (
    <Stack
      direction="row"
      sx={{
        p: 2,
        gap: 1,
        alignItems: "center",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Avatar sizes="small" title={fullName} sx={{ width: 36, height: 36 }}>
        {initials}
      </Avatar>
      <Box sx={{ mr: "auto" }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, lineHeight: "16px" }}
        >
          {fullName}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {email}
        </Typography>
      </Box>
      <OptionsMenu />
    </Stack>
  );
};

export default UserProfile;
