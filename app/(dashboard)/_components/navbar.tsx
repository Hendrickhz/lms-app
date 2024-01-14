
import NavbarRouteItems from "@/components/navbar-routeItems";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className=" w-full p-4  h-[80px] flex justify-between items-center border-b shadow-sm">
      <MobileSidebar />
      <NavbarRouteItems />
    </div>
  );
};

export default Navbar;
