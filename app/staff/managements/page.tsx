"use client";

import React, { useMemo } from "react";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Selection,
  ChipProps,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import DataTable, { Column } from "@/components/DataTable";

// --- 1. Types & Config ---
type Staff = {
  id: number;
  name: string;
  email: string;
  role: string;
  station: string;
  status: string;
  joinDate: string;
  avatar: string;
};

const columns: Column[] = [
  { name: "STAFF INFO", uid: "name", sortable: true, align: "start" },
  { name: "ROLE", uid: "role", sortable: true, align: "start" },
  { name: "ASSIGNED STATION", uid: "station", sortable: true, align: "start" },
  { name: "JOIN DATE", uid: "joinDate", sortable: true, align: "start" },
  { name: "STATUS", uid: "status", sortable: true, align: "start" },
  { name: "ACTIONS", uid: "actions", align: "center" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  Active: "success",
  "On Leave": "warning",
  Inactive: "danger",
};

// --- 2. Mock Data ---
const users: Staff[] = [
  {
    id: 1,
    name: "Tony Reichert",
    email: "tony.reichert@evdrive.com",
    role: "Station Manager",
    station: "Downtown Central Hub",
    status: "Active",
    joinDate: "2024-01-15",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Zoey Lang",
    email: "zoey.lang@evdrive.com",
    role: "Tech Specialist",
    station: "Northside Supercharger",
    status: "On Leave",
    joinDate: "2024-02-10",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Jane Fisher",
    email: "jane.fisher@evdrive.com",
    role: "Station Staff",
    station: "Downtown Central Hub",
    status: "Active",
    joinDate: "2024-03-22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 4,
    name: "William Howard",
    email: "william.h@evdrive.com",
    role: "Security",
    station: "Westgate Retail Park",
    status: "Inactive",
    joinDate: "2023-11-05",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026024d",
  },
  {
    id: 5,
    name: "Kristen Copper",
    email: "kristen.co@evdrive.com",
    role: "Station Staff",
    station: "Airport Plaza",
    status: "Active",
    joinDate: "2024-05-12",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
  {
    id: 6,
    name: "Brian Kim",
    email: "brian.kim@evdrive.com",
    role: "Station Staff",
    station: "Northside Supercharger",
    status: "Active",
    joinDate: "2024-06-01",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
  },
];

export default function StaffManagement() {
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  // --- 3. Logic Filter & Pagination ---
  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (filterValue) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== 3) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }
    return filteredUsers;
  }, [filterValue, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  // --- 4. Render Cell Function ---
  const renderCell = React.useCallback((user: Staff, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Staff];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
            classNames={{
              name: "text-default-900 font-semibold",
              description: "text-default-500",
            }}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-default-900 capitalize">
              {cellValue}
            </p>
            <p className="text-bold text-xs text-default-500 capitalize">
              Employee
            </p>
          </div>
        );
      case "station":
        return (
          <div className="flex items-center gap-2 text-default-600">
            <Icon icon="lucide:map-pin" width={14} />
            <span>{cellValue}</span>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
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
                    icon="lucide:more-vertical"
                    className="text-default-400"
                    width={20}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Staff Actions">
                <DropdownItem
                  key="view"
                  startContent={<Icon icon="lucide:eye" />}
                >
                  View Profile
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  startContent={<Icon icon="lucide:edit-3" />}
                >
                  Edit Details
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Icon icon="lucide:trash-2" />}
                >
                  Remove Staff
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return <span className="text-default-600">{cellValue}</span>;
    }
  }, []);

  return (
    <div className="">
      <div className="flex flex-col gap-6">
        {/* Header & Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold ">Staff Management</h2>
            <p className="text-sm text-default-600">
              Manage all station employees and their roles
            </p>
          </div>
          <Button color="primary" startContent={<Icon icon="lucide:plus" />}>
            Add New Staff
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={items}
          renderCell={renderCell}
          page={page}
          totalPages={Math.ceil(filteredItems.length / rowsPerPage)}
          totalItems={filteredItems.length}
          onPageChange={setPage}
          showPagination={true}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
}
