// components/Header.tsx
import { CheckOut } from "@/cosmic/blocks/ecommerce/CheckOut";
import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";
import { cosmic } from "@/cosmic/client";
import Link from "next/link";
import ThemeToggleSwitch from "./ThemeToggleSwitch";

export async function Header() {
  // Header data
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1);

  return (
    <div className="space-x-4 sticky top-0 bg-neutral-300 dark:bg-neutral-900 backdrop-blur-lg py-2 w-full z-[9999]">
      <div className="m-auto flex items-center md:container justify-between pl-2 pr-4">
        <Link href="/">
          <img
            src={`${settings.metadata.logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="h-14 m-auto dark:hidden"
          />
          <img
            src={`${settings.metadata.dark_logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="h-14 m-auto hidden dark:block"
          />
        </Link>
        <NavMenu query={{ type: "navigation-menus", slug: "header" }} />
        <div className="hidden ml-4 md:flex text-center justify-center">
          <ThemeToggleSwitch />
          <CheckOut productPath={"/shop"} />
        </div>
      </div>
    </div>
  );
}
