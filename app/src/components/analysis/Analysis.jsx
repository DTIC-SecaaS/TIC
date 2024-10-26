import React, { useState } from "react";
import BaseLayout from "../BaseLayout/BaseLayout";
import AnalysisPage from "./components/AnalysisPage";
import AnalysisCards from "./components/AnalysisCards";

export default function Analysis() {
  const [currentMenu, setCurrentMenu] = useState("analysis");
  const [showAnalysisPage, setShowAnalysisPage] = useState(false);

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  const handleNewAnalysis = () => {
    setShowAnalysisPage(true);
  };

  const handleBackToCards = () => {
    setShowAnalysisPage(false);
  };

  return (
    <BaseLayout currentMenu={currentMenu} onMenuClick={handleMenuClick}>
      {showAnalysisPage ? (
        <AnalysisPage onBack={handleBackToCards} />
      ) : (
        <AnalysisCards onNewAnalysis={handleNewAnalysis} />
      )}
    </BaseLayout>
  );
}
