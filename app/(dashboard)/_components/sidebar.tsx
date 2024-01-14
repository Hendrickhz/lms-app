import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className=" w-full flex flex-col  shadow-sm h-full overflow-y-auto bg-white">
      <div className="p-6">
        <Logo />
      </div>
      <div className="">
        <SidebarRoutes/>
      </div>
    </div>
  );
};

export default Sidebar;
