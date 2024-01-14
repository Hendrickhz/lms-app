import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
const MobileSidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className=" cursor-pointer md:hidden" />
        </SheetTrigger>
        <SheetContent side={"left"} className=" p-0 bg-white">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
