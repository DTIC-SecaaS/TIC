import React, { useState } from "react";
import BaseLayout from "../BaseLayout/BaseLayout";
import MainPage from "./components/MainPage";

export default function Vulnerabilities() {
  const [currentMenu, setCurrentMenu] = useState("vulnerabilities");

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <BaseLayout currentMenu={currentMenu} onMenuClick={handleMenuClick}>
      <MainPage />
    </BaseLayout>
  );
}
