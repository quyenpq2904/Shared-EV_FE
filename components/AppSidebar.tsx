import { useAuthContext } from "@/contexts/AuthContext";
import { Listbox, ListboxItem, ListboxSection, User } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { ForwardedRef } from "react";

interface NextLinkWrapperProps extends LinkProps {
  children?: React.ReactNode;
  className?: string;
  textValue?: string;
}

const NextLinkWrapper = React.forwardRef(
  (
    { textValue, ...props }: NextLinkWrapperProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return <Link ref={ref} {...props} />;
  }
);

NextLinkWrapper.displayName = "NextLinkWrapper";

const sidebarConfig = [
  {
    title: "General",
    items: [
      {
        key: "overview",
        label: "Overview",
        href: "/me",
        icon: "solar:pie-chart-2-linear",
      },
    ],
  },
  {
    title: "Assets Management",
    items: [
      {
        key: "garage",
        label: "My Garage",
        href: "/me/garage",
        icon: "game-icons:city-car",
      },
      {
        key: "offerings",
        label: "My Offerings",
        href: "/me/offerings",
        icon: "solar:tag-price-linear",
      },
    ],
  },
  {
    title: "Activity & Collaboration",
    items: [
      {
        key: "messages",
        label: "Messages",
        href: "/me/messages",
        icon: "solar:letter-linear",
      },
      {
        key: "transactions",
        label: "Transactions",
        href: "/me/transactions",
        icon: "solar:bill-list-linear",
      },
      {
        key: "co-ownerships",
        label: "Co-Ownerships",
        href: "/me/co-ownerships",
        icon: "solar:users-group-rounded-linear",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        key: "settings",
        label: "Settings",
        href: "/me/settings",
        icon: "solar:settings-linear",
      },
    ],
  },
];

function AppSidebar() {
  const pathname = usePathname();
  const { profile } = useAuthContext();
  const fullName = profile ? profile.fullName : "Loading...";

  return (
    <div className="w-full max-w-[300px] flex flex-col gap-4">
      <div className="px-4 py-2">
        <User
          name={fullName}
          description={profile?.email}
          avatarProps={{
            src: profile?.avatar,
            size: "md",
            isBordered: true,
            color: "primary",
            name: profile?.fullName?.[0],
          }}
          classNames={{
            name: "text-foreground font-semibold",
            description: "text-default-600",
          }}
        />
      </div>

      <Listbox
        aria-label="User Menu"
        variant="light"
        color="primary"
        className="p-0 gap-0 overflow-visible rounded-medium"
        itemClasses={{
          base: "px-3 gap-3 h-10 data-[hover=true]:bg-default-100/80 my-1",
        }}
      >
        {sidebarConfig.map((section) => (
          <ListboxSection
            key={section.title}
            title={section.title}
            showDivider
            classNames={{
              heading:
                "text-xs font-bold text-default-600 uppercase px-3 mt-4 mb-2",
            }}
          >
            {section.items.map((item) => (
              <ListboxItem
                key={item.href}
                href={item.href}
                as={NextLinkWrapper}
                startContent={
                  <Icon
                    icon={item.icon}
                    className={`text-xl ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-default-700"
                    }`}
                  />
                }
                className={
                  pathname === item.href
                    ? "font-semibold text-primary bg-primary/10 rounded-medium"
                    : "text-default-700 rounded-medium"
                }
                textValue={item.label}
              >
                {item.label}
              </ListboxItem>
            ))}
          </ListboxSection>
        ))}
      </Listbox>
    </div>
  );
}

export default AppSidebar;
