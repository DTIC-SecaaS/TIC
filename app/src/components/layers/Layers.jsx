import React, { useState } from "react";
import BaseLayout from "../BaseLayout/BaseLayout";
import LayersPage from "./components/LayersPage";

export default function Layers() {
  const [currentMenu, setCurrentMenu] = useState("layers");

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <BaseLayout currentMenu={currentMenu} onMenuClick={handleMenuClick}>
      <LayersPage />
    </BaseLayout>
  );
}
