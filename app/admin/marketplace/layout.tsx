"use client";

import React from "react";
import { Tabs, Tab, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeKey = pathname.split("/").pop();

  const handleTabChange = (key: React.Key) => {
    router.push(`/admin/marketplace/${key}`);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <div>
          <Tabs
            variant="underlined"
            aria-label="Approval Tabs"
            color="primary"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0",
              cursor: "w-full",
              tab: "max-w-fit px-0 h-12",
              tabContent: "font-medium text-base",
            }}
            selectedKey={activeKey}
            onSelectionChange={handleTabChange}
          >
            <Tab key="pending-approval" title="Pending Listings" />
            <Tab key="contracts" title="Contract Transfers" />
            <Tab key="fees" title="Fees Config" />
          </Tabs>
        </div>

        <div className="w-1/3">
          <Input
            placeholder="Search listings by User ID, Vehicle, or Price..."
            startContent={
              <Icon
                icon="lucide:search"
                width={20}
                className="text-default-600"
              />
            }
            type="search"
          />
        </div>
        <div className="fade-in">{children}</div>
      </div>
    </div>
  );
}
