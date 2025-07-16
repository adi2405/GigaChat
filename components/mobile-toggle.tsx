import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ServerSidebar } from "./server/server-sidebar";

export const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="md:hidden cursor-pointer"
          asChild
        >
          <Menu className="h-6 w-6 mr-3" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-0 gap-0">
        <div className="flex flex-1 flex-row pt-12 bg-white dark:bg-[#333333]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="w-[72px]">
            <NavigationSidebar />
          </div>
          <ServerSidebar serverId={serverId} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
