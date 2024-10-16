import React, { useState } from "react";
import BaseLayout from "../BaseLayout/BaseLayout";
import MainGrid from "./components/MainGrid";

export default function Dashboard() {
  const [currentMenu, setCurrentMenu] = useState("home");

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <BaseLayout currentMenu={currentMenu} onMenuClick={handleMenuClick}>
      <MainGrid />
    </BaseLayout>
  );
}
