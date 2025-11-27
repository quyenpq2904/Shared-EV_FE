"use client";

import React, { useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tab,
  Tabs,
  Selection,
  Card,
  CardBody,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/StatsCard";

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

const columns = [
  { name: "TICKET ID", uid: "id", sortable: true },
  { name: "REQUESTED BY", uid: "requestedBy", sortable: true },
  { name: "SUBJECT", uid: "subject" },
  { name: "CREATE DATE", uid: "date", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
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

function TicketsPage() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [statusFilter, setStatusFilter] = React.useState<string | number>(
    "all"
  );
  const [page, setPage] = React.useState(1);
  const router = useRouter();

  const renderCell = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (user: any, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof typeof user];

      switch (columnKey) {
        case "id":
          return <span className="text-small">{cellValue}</span>;

        case "requestedBy":
          return (
            <User
              avatarProps={{ radius: "lg", src: "" }}
              description={user.email}
              name={cellValue}
              classNames={{
                name: "font-semibold ",
              }}
            >
              {user.email}
            </User>
          );

        case "subject":
          return (
            <p className="text-small truncate max-w-[300px]">{cellValue}</p>
          );

        case "date":
          return <span className="text-small">{cellValue}</span>;

        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );

        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <Icon icon="solar:menu-dots-bold" className="text-xl" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="details"
                    onPress={() => router.push("/admin/tickets/123123")}
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

  const topContent = useMemo(() => {
    return (
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
    );
  }, [filterValue, statusFilter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center border-t border-default-100 mt-2">
        <span className="w-[30%] text-small ">
          Showing <span className="font-semibold">1</span> to{" "}
          <span className="font-semibold">10</span> of{" "}
          <span className="font-semibold">12</span>
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={10}
          onChange={setPage}
          classNames={{
            cursor: "bg-primary text-white font-bold",
          }}
        />
      </div>
    );
  }, [page]);

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

      <div className="bg-content1 border border-default-200 rounded-xl p-4 shadow-sm">
        <Table
          aria-label="Support Tickets Table"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[600px] shadow-none bg-transparent p-0",
            th: "bg-transparent text-default-900 border-b border-default-200 font-semibold h-10",
            td: "py-4 border-b border-default-100 group-last:border-none",
            thead: "[&>tr]:first:shadow-none",
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={{ column: "date", direction: "descending" }}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No tickets found"} items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default TicketsPage;
