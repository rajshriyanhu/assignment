"use client";

import Link from "next/link";
import { useHeader } from "@/hooks/use-header";

const Header = () => {
  const { showBackButton, backUrl, title } = useHeader();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          {/* <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" /> */}
          {showBackButton && (
            <>
              <Link href={backUrl} className=" text-blue-500">
                ← Back
              </Link>
            </>
          )}
          {title}
        </div>
      </div>
    </header>
  );
};

export default Header;
