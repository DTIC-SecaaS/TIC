import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import {
  menuContentMainItems,
  menuContentSecondaryItems,
} from "../../constants/consts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MenuContent({ onMenuClick }) {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(null);

  const handleItemClick = (item) => {
    setSelectedKey(item.key);
    onMenuClick(item.key);
    navigate(item.route);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {menuContentMainItems.map((item, index) => (
          <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedKey === item.key}
              onClick={() => handleItemClick(item)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {menuContentSecondaryItems.map((item) => (
          <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedKey === item.key}
              onClick={() => handleItemClick(item)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
