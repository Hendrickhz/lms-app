
import NavbarRouteItems from "@/components/navbar-routeItems";
import MobileSidebar from "./mobile-sidebar";
import { auth } from "@clerk/nextjs";

const Navbar = () => {
  const {userId}= auth();
  return (
    <div className=" w-full p-4  h-[80px] flex justify-between items-center border-b shadow-sm">
      <MobileSidebar />
      <NavbarRouteItems  userId={userId||''}/>
    </div>
  );
};

export default Navbar;
