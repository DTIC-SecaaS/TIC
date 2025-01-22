// import React, { useState } from "react";
// import BaseLayout from "../BaseLayout/BaseLayout";
// import MainGrid from "./components/MainGrid";

// export default function Dashboard() {
//   const [currentMenu, setCurrentMenu] = useState("home");

//   const handleMenuClick = (menuKey) => {
//     setCurrentMenu(menuKey);
//   };

//   return (
//     <BaseLayout currentMenu={currentMenu} onMenuClick={handleMenuClick}>
//       <MainGrid />
//     </BaseLayout>
//   );
// }
import React, { useState, forwardRef } from "react";
import BaseLayout from "../BaseLayout/BaseLayout";
import MainGrid from "./components/MainGrid";

const Dashboard = forwardRef((props, ref) => {
  const [currentMenu, setCurrentMenu] = useState("home");

  const handleMenuClick = (menuKey) => {
    setCurrentMenu(menuKey);
  };

  return (
    <div ref={ref}>
      <BaseLayout currentMenu={currentMenu} onMenuClick={handleMenuClick}>
        <MainGrid />
      </BaseLayout>
    </div>
  );
});

export default Dashboard;
