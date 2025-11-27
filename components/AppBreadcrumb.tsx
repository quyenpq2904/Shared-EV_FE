"use client";

import { routeNameMap } from "@/lib/routes";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { usePathname } from "next/navigation";

interface AppBreadcrumbsProps {
  dynamicRoutes?: Record<string, string>;
}

function AppBreadcrumb({ dynamicRoutes = {} }: AppBreadcrumbsProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((path) => path);

  const getLabel = (segment: string) => {
    if (dynamicRoutes[segment]) {
      return dynamicRoutes[segment];
    }

    if (routeNameMap[segment]) {
      return routeNameMap[segment];
    }

    if (segment.length > 20 || /^\d+$/.test(segment)) {
      return `#${segment.slice(-4)}`;
    }

    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );
  };

  if (pathname === "/") return null;

  return (
    <Breadcrumbs
      variant="light"
      underline="hover"
      className="mb-3 ml-2"
      classNames={{ list: "p-0" }}
      itemClasses={{
        item: "text-default-600 data-[current=true]:text-default-900 data-[current=true]:font-semibold",
        separator: "text-default-600",
      }}
    >
      <BreadcrumbItem href="/">Home</BreadcrumbItem>

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        const label = getLabel(segment);

        return (
          <BreadcrumbItem
            key={href}
            href={isLast ? undefined : href}
            isCurrent={isLast}
          >
            {label}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}

export default AppBreadcrumb;
