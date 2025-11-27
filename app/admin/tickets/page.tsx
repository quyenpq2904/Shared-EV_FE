"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Chip,
  User,
  Input,
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/StatsCard";
import DataTable, { Column } from "@/components/DataTable";

const stats = [
  {
    title: "Total tickets",
    value: "5,347",
    icon: "solar:ticket-sale-linear",
    color: "text-primary",
    bg: "bg-primary-50",
  },
  {
    title: "Pending tickets",
    value: "1,230",
    icon: "solar:hourglass-linear",
    color: "text-warning",
    bg: "bg-warning-50",
  },
  {
    title: "Solved tickets",
    value: "4,117",
    icon: "solar:check-circle-linear",
    color: "text-success",
    bg: "bg-success-50",
  },
];

const columns: Column[] = [
  { name: "TICKET ID", uid: "id", sortable: true },
  { name: "REQUESTED BY", uid: "requestedBy", sortable: true },
  { name: "SUBJECT", uid: "subject" },
  { name: "CREATE DATE", uid: "date", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions", align: "center" },
];

const users = [
  {
    id: "#323534",
    name: "Lindsey Curtis",
    email: "demoemail@gmail.com",
    subject: "Issue with Dashboard Login Access",
    date: "12 Feb, 2027",
    status: "Solved",
  },
  {
    id: "#323535",
    name: "Kaiya George",
    email: "demoemail@gmail.com",
    subject: "Billing Information Not Updating Properly",
    date: "13 Mar, 2027",
    status: "Pending",
  },
  {
    id: "#323536",
    name: "Zain Geidt",
    email: "demoemail@gmail.com",
    subject: "Bug Found in Dark Mode Layout",
    date: "19 Mar, 2027",
    status: "Pending",
  },
  {
    id: "#323537",
    name: "Abram Schleifer",
    email: "demoemail@gmail.com",
    subject: "Request to Add New Integration Feature",
    date: "25 Apr, 2027",
    status: "Solved",
  },
  {
    id: "#323538",
    name: "Mia Chen",
    email: "mia.chen@email.com",
    subject: "Unable to Reset Password",
    date: "28 Apr, 2027",
    status: "Pending",
  },
  {
    id: "#323539",
    name: "John Doe",
    email: "john.doe@email.com",
    subject: "Feature Request: Dark Mode",
    date: "30 Apr, 2027",
    status: "Solved",
  },
  {
    id: "#323540",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    subject: "Error 500 on Dashboard",
    date: "01 May, 2027",
    status: "Pending",
  },
];

const statusColorMap: Record<string, "success" | "warning" | "default"> = {
  Solved: "success",
  Pending: "warning",
  Closed: "default",
};

export default function TicketsPage() {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | number>("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filteredItems = useMemo(() => {
    let filtered = [...users];
    if (filterValue) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [filterValue, statusFilter]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
  const renderCell = useCallback(
    (user: any, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof typeof user];

      switch (columnKey) {
        case "id":
          return (
            <span className="text-small text-default-600">{cellValue}</span>
          );

        case "requestedBy":
          return (
            <User
              avatarProps={{ radius: "lg", src: "" }}
              description={user.email}
              name={cellValue}
              classNames={{
                name: "font-semibold text-default-900",
                description: "text-default-600",
              }}
            >
              {user.email}
            </User>
          );

        case "subject":
          return (
            <p className="text-small font-medium text-default-700 truncate max-w-[300px]">
              {cellValue}
            </p>
          );

        case "date":
          return (
            <span className="text-small text-default-600">{cellValue}</span>
          );

        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1 font-medium"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );

        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <Icon
                      icon="solar:menu-dots-bold"
                      className="text-xl text-default-400"
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="details"
                    onPress={() =>
                      router.push(`/admin/tickets/${user.id.replace("#", "")}`)
                    }
                  >
                    View Details
                  </DropdownItem>
                  <DropdownItem key="edit">Edit Ticket</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [router]
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            iconColor={item.color}
            iconBg={item.bg}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4 ">
          {/* Title & Description bên trong Table header để thẳng hàng */}
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-default-900">
              Support Tickets
            </h2>
            <p className="text-small text-default-700">
              Your most recent support tickets list
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-3 items-end flex-wrap">
          <Tabs
            aria-label="Filter Status"
            variant="solid"
            selectedKey={statusFilter}
            onSelectionChange={setStatusFilter}
          >
            <Tab key="all" title="All" />
            <Tab key="solved" title="Solved" />
            <Tab key="pending" title="Pending" />
            <Tab key="closed" title="Closed" />
          </Tabs>

          <div className="flex gap-3 w-full sm:w-auto">
            <Input
              isClearable
              className="w-full sm:max-w-[300px]"
              placeholder="Search..."
              startContent={<Icon icon="solar:magnifer-linear" />}
              value={filterValue}
              onClear={() => setFilterValue("")}
              onValueChange={setFilterValue}
              variant="bordered"
            />
            <Button
              variant="bordered"
              startContent={<Icon width={32} icon="solar:filter-linear" />}
              className="font-medium"
            >
              Filter
            </Button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paginatedItems}
        renderCell={renderCell}
        page={page}
        totalPages={totalPages}
        totalItems={filteredItems.length}
        onPageChange={setPage}
      />
    </div>
  );
}
