import React, { useState } from "react";
import BaseLayout from "../BaseLayout/BaseLayout";
import AnalysisPage from "./components/AnalysisPage";

export default function Analysis() {
  const [currentMenu, setCurrentMenu] = useState("home");

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <BaseLayout currentMenu={currentMenu} onMenuClick={handleMenuClick}>
      <AnalysisPage />
    </BaseLayout>
  );
}
