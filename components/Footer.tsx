// components/Footer.tsx
import Link from "next/link";
import { cosmic } from "@/cosmic/client";
import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";
type LinkType = {
  url: string;
  company: string;
  icon: {
    imgix_url: string;
  };
};

export async function Footer() {
  // Footer data
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("id,metadata")
    .depth(1);

  return (
    <div className="my-10">
      <div className="my-8 text-center">
        <NavMenu
          query={{ type: "navigation-menus", slug: "footer" }}
          hasMobileMenu={false}
        />
      </div>
      <div data-cosmic-object={settings.id}>
        <div className="mb-8 flex gap-x-8 justify-center">
          {settings.metadata.links.map((link: LinkType) => {
            return (
              <Link
                href={link.url}
                key={link.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="h-[26px]"
                  src={`${link.icon.imgix_url}?w=500&auto=format,compression`}
                  alt={link.company}
                />
              </Link>
            );
          })}
        </div>
        <div className="flex gap-x-8 justify-center">
          <div>
            <a href={`mailto:${settings.metadata.email}`}>Email us</a>
          </div>
          <div>
            <a href={`tel:${settings.metadata.phone}`}>Call us</a>
          </div>
        </div>
      </div>
    </div>
  );
}

