import React, { useState } from "react";
import BaseLayout from "../BaseLayout/BaseLayout";
import MainPage from "./components/MainPage";

export default function Assets() {
  const [currentMenu, setCurrentMenu] = useState("assets");

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <BaseLayout currentMenu={currentMenu} onMenuClick={handleMenuClick}>
      <MainPage />
    </BaseLayout>
  );
}
