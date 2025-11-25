"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import {
  Accordion,
  AccordionItem,
  Button,
  Link,
  ScrollShadow,
  Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import AppIcon from "./AppIcon";

const BASE_PATH = "/admin";

type NavItem = {
  name: string;
  icon: string;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: "solar:widget-5-outline",
    name: "Dashboard",
    path: "",
  },
  {
    icon: "solar:calendar-linear",
    name: "Calendar",
    path: "calendar",
  },
  {
    icon: "solar:user-circle-linear",
    name: "User Profile",
    path: "profile",
  },
  {
    name: "Forms",
    icon: "solar:checklist-minimalistic-linear",
    subItems: [{ name: "Form Elements", path: "form-elements" }],
  },
  {
    name: "Tables",
    icon: "solar:server-square-linear",
    subItems: [{ name: "Basic Tables", path: "basic-tables" }],
  },
  {
    name: "Pages",
    icon: "solar:file-text-linear",
    subItems: [
      { name: "Blank Page", path: "blank" },
      { name: "404 Error", path: "error-404" },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: "solar:chart-2-linear",
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "line-chart" },
      { name: "Bar Chart", path: "bar-chart" },
    ],
  },
  {
    icon: "solar:box-linear",
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "alerts" },
      { name: "Avatar", path: "avatars" },
      { name: "Badge", path: "badge" },
      { name: "Buttons", path: "buttons" },
      { name: "Images", path: "images" },
      { name: "Videos", path: "videos" },
    ],
  },
  {
    icon: "solar:login-2-linear",
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "signin" },
      { name: "Sign Up", path: "signup" },
    ],
  },
];

function AdminSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isFullSidebar = isExpanded || isHovered || isMobileOpen;

  const getFullPath = useCallback((path?: string) => {
    if (path === undefined) return "#";
    return path ? `${BASE_PATH}/${path}` : BASE_PATH;
  }, []);

  const isActive = useCallback(
    (path?: string) => {
      const fullPath = getFullPath(path);
      if (fullPath === BASE_PATH) {
        return pathname === fullPath;
      }
      return pathname.startsWith(fullPath);
    },
    [pathname, getFullPath]
  );

  const activeClass = "bg-primary-50 text-primary font-medium";

  const inactiveClass =
    "text-foreground hover:bg-default-100 hover:text-primary";

  const renderSingleItem = (nav: NavItem) => {
    const active = isActive(nav.path);
    const href = getFullPath(nav.path);

    const content = (
      <Button
        as={Link}
        href={href}
        fullWidth
        variant="light"
        className={`h-12 gap-3 min-w-0 ${
          isFullSidebar ? "justify-start px-3" : "justify-center px-0"
        } ${active ? activeClass : inactiveClass}`}
        startContent={
          <Icon
            icon={nav.icon}
            className={`text-2xl shrink-0 ${
              active ? "text-primary" : "text-foreground/80"
            }`}
          />
        }
      >
        {isFullSidebar && <span className="truncate">{nav.name}</span>}
      </Button>
    );

    if (!isFullSidebar) {
      return (
        <Tooltip content={nav.name} placement="right" color="primary">
          <div className="w-full flex justify-center py-1">{content}</div>
        </Tooltip>
      );
    }

    return <li className="mb-1">{content}</li>;
  };

  const renderGroupItem = (nav: NavItem) => {
    const isChildActive = nav.subItems?.some((sub) => isActive(sub.path));

    if (!isFullSidebar) {
      return (
        <Tooltip content={nav.name} placement="right" color="primary">
          <div className="w-full flex justify-center py-1">
            <Button
              isIconOnly
              variant="light"
              className={`text-foreground/80 ${
                isChildActive ? "text-primary bg-primary-50" : ""
              }`}
              onPress={() => setIsHovered(true)}
            >
              <Icon icon={nav.icon} className="text-2xl" />
            </Button>
          </div>
        </Tooltip>
      );
    }

    return (
      <Accordion
        isCompact
        hideIndicator={false}
        keepContentMounted
        defaultExpandedKeys={isChildActive ? ["1"] : []}
        className="px-0"
        itemClasses={{
          base: "w-full p-0 mb-1",
          trigger: `px-3 h-12 rounded-medium transition-colors group ${
            isChildActive ? activeClass : inactiveClass
          }`,
          title: `text-sm ${
            isChildActive
              ? "text-primary font-medium"
              : "text-foreground font-normal"
          }`,
          indicator: `${isChildActive ? "text-primary" : "text-foreground/60"}`,
          content: "pb-2 pl-0",
        }}
      >
        <AccordionItem
          key="1"
          aria-label={nav.name}
          title={nav.name}
          startContent={
            <span
              className={`shrink-0 text-2xl ${
                isChildActive ? "text-primary" : "text-foreground/80"
              }`}
            >
              <Icon icon={nav.icon} />
            </span>
          }
        >
          <div className="flex flex-col gap-1 pl-10">
            {nav.subItems?.map((sub) => {
              const subActive = isActive(sub.path);
              const subHref = getFullPath(sub.path);

              return (
                <Link
                  key={sub.name}
                  href={subHref}
                  className={`relative flex items-center justify-between py-2 px-3 rounded-md text-sm transition-colors ${
                    subActive
                      ? "bg-primary-50 text-primary font-medium"
                      : "text-foreground/80 hover:bg-default-100 hover:text-primary"
                  }`}
                >
                  {sub.name}
                </Link>
              );
            })}
          </div>
        </AccordionItem>
      </Accordion>
    );
  };

  const renderSection = (title: string, items: NavItem[]) => (
    <div className="mb-6 w-full">
      <div
        className={`mb-2 px-4 flex items-center h-6 ${
          !isFullSidebar
            ? "justify-center text-default-500"
            : "justify-start text-default-600 dark:text-default-500"
        }`}
      >
        {isFullSidebar ? (
          <span className="text-xs font-bold uppercase tracking-wider">
            {title}
          </span>
        ) : (
          <Icon icon="solar:menu-dots-bold" className="text-xl" />
        )}
      </div>

      <ul className="flex flex-col gap-0.5 w-full">
        {items.map((nav, idx) => (
          <div key={`${title}-${idx}`} className="w-full">
            {nav.subItems ? renderGroupItem(nav) : renderSingleItem(nav)}
          </div>
        ))}
      </ul>
    </div>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-background border-r border-divider transition-all duration-300 ease-in-out
        ${isFullSidebar ? "w-[280px]" : "w-[80px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-16 flex items-center  ${
          isFullSidebar ? "px-6 justify-start" : "justify-center px-0"
        }`}
      >
        <Link href="/admin">
          <AppIcon size={40} />
          {isFullSidebar && (
            <p className="font-bold text-xl ml-2 text-foreground">Acme</p>
          )}
        </Link>
      </div>

      <ScrollShadow className="h-[calc(100vh-64px)] pb-10" hideScrollBar>
        <div className="py-6 px-3">
          {renderSection("Menu", navItems)}
          {renderSection("Others", othersItems)}
        </div>
      </ScrollShadow>
    </aside>
  );
}

export default AdminSidebar;
