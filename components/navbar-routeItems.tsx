import { UserButton } from "@clerk/nextjs";
import React from "react";

const NavbarRouteItems = () => {
  return (
    <div className=" flex  gap-x-2 ml-auto">
      {" "}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRouteItems;
