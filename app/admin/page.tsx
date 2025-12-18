"use client";

import React from "react";
import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Pagination,
} from "@heroui/react";
import { Icon } from "@iconify/react";

// Mock Data for Table
const columns = [
  { name: "VEHICLE INFO", uid: "vehicle" },
  { name: "OWNER", uid: "owner" },
  { name: "REGISTRATION DATE", uid: "date" },
  { name: "VALUATION", uid: "price" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

const users = [
  {
    id: 1,
    vehicle: {
      name: "VinFast VF 9",
      desc: "E-Class SUV - Electric",
      image:
        "https://images.unsplash.com/photo-1698319690626-444465457319?q=80&w=300&auto=format&fit=crop",
    },
    owner: {
      name: "Nguyen Van A",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    date: {
      day: "20/05/2024",
      time: "10:30 AM",
    },
    price: "1.49 Billion VND",
    status: "pending",
  },
  {
    id: 2,
    vehicle: {
      name: "Mercedes-Benz GLC",
      desc: "Luxury SUV",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=300&auto=format&fit=crop",
    },
    owner: {
      name: "Tran Thi B",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    date: {
      day: "19/05/2024",
      time: "14:15 PM",
    },
    price: "2.15 Billion VND",
    status: "pending",
  },
  {
    id: 3,
    vehicle: {
      name: "Hyundai Santa Fe",
      desc: "7-Seater SUV",
      image:
        "https://images.unsplash.com/photo-1589148938909-4d241c9113f5?q=80&w=300&auto=format&fit=crop",
    },
    owner: {
      name: "Le Van C",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    },
    date: {
      day: "18/05/2024",
      time: "09:00 AM",
    },
    price: "1.10 Billion VND",
    status: "approved",
  },
  {
    id: 4,
    vehicle: {
      name: "Mazda CX-5",
      desc: "Crossover 5-seater",
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=300&auto=format&fit=crop",
    },
    owner: {
      name: "Pham Thi D",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    },
    date: {
      day: "17/05/2024",
      time: "16:45 PM",
    },
    price: "980 Million VND",
    status: "approved",
  },
];

const statusColorMap: Record<string, "warning" | "success" | "danger"> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

export default function AdminPage() {
  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof typeof user];

    switch (columnKey) {
      case "vehicle":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: user.vehicle.image,
              className:
                "w-16 h-10 transform hover:scale-110 transition-transform duration-300",
            }}
            description={user.vehicle.desc}
            name={user.vehicle.name}
          >
            {user.vehicle.name}
          </User>
        );
      case "owner":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.owner.avatar }}
            name={user.owner.name}
          />
        );
      case "date":
        return (
          <div className="flex flex-col">
            <span className="text-bold text-small capitalize">
              {user.date.day}
            </span>
            <span className="text-tiny text-default-400">{user.date.time}</span>
          </div>
        );
      case "price":
        return (
          <span className="text-bold font-semibold text-default-900">
            {cellValue}
          </span>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
            startContent={
              <span
                className={`w-1.5 h-1.5 rounded-full mr-1 ${
                  user.status === "pending" ? "bg-warning" : "bg-success"
                }`}
              ></span>
            }
          >
            {cellValue === "pending" ? "Pending Approval" : "Approved"}
          </Chip>
        );
      case "action":
        return (
          <div className="relative flex items-center gap-2">
            {user.status === "pending" ? (
              <Button
                color="primary"
                size="sm"
                radius="full"
                className="px-6 font-medium bg-primary-600 shadow-md shadow-primary/20"
              >
                Approve
              </Button>
            ) : (
              <Button
                variant="bordered"
                size="sm"
                radius="full"
                className="px-6 font-medium border-default-200 hover:bg-default-50"
              >
                Details
              </Button>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="space-y-8 p-1">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-default-900">Overview</h1>
          <p className="text-default-500 mt-1">
            Welcome back Admin, here is the system activity report for today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="bg-content1"
            startContent={<Icon icon="solar:export-linear" />}
          >
            Export Report
          </Button>
          <Button
            color="primary"
            className="font-medium shadow-lg shadow-primary/20"
            startContent={<Icon icon="solar:add-circle-bold" />}
          >
            Add New Vehicle
          </Button>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Pending */}
        <Card className="bg-gradient-to-br from-[#5B4EF1] to-[#8B5CF6] text-white border-none shadow-xl shadow-indigo-500/20">
          <CardBody className="p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="absolute right-10 bottom-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-6 right-6 p-3 bg-white/20 rounded-xl backdrop-blur-md border border-white/10">
              <Icon icon="solar:clipboard-check-bold" className="text-2xl" />
            </div>

            <p className="text-indigo-100 font-medium mb-1 z-10">
              Pending Approval
            </p>
            <div className="flex items-end gap-3 mb-6 z-10">
              <span className="text-5xl font-bold">12</span>
              <span className="flex items-center text-indigo-200 text-sm mb-1.5 font-medium bg-white/10 px-2 py-0.5 rounded-lg">
                <Icon icon="solar:graph-up-linear" className="mr-1" /> +2
              </span>
            </div>
            <p className="text-indigo-100 text-xs z-10 opacity-80">
              Updated 5 mins ago
            </p>
          </CardBody>
        </Card>

        {/* Card 2: Total Vehicles */}
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardBody className="p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
              <Icon icon="bx:car" className="text-2xl" />
            </div>
            <p className="text-default-500 font-medium mb-1">Total Vehicles</p>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-default-900">145</span>
              <Chip color="success" variant="flat" size="sm" className="mb-1">
                <Icon icon="solar:arrow-up-linear" className="inline mr-1" />
                5%
              </Chip>
            </div>
            <p className="text-default-400 text-xs">vs last month</p>
          </CardBody>
        </Card>

        {/* Card 3: Asset Value */}
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardBody className="p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
              <Icon icon="solar:wallet-money-bold" className="text-2xl" />
            </div>
            <p className="text-default-500 font-medium mb-1">
              Total Asset Value
            </p>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-default-900">$2.5M</span>
              <Chip color="success" variant="flat" size="sm" className="mb-1">
                <Icon icon="solar:arrow-up-linear" className="inline mr-1" />
                12%
              </Chip>
            </div>
            <p className="text-default-400 text-xs">USD (Approx. 56.5B VND)</p>
          </CardBody>
        </Card>
      </div>

      {/* --- RECENT REGISTRATIONS TABLE --- */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <div className="flex items-center gap-2 border-l-4 border-primary pl-3">
            <h2 className="text-lg font-bold text-default-900">
              Latest Registrations
            </h2>
          </div>
          <Button
            variant="light"
            color="primary"
            className="font-medium"
            endContent={<Icon icon="solar:arrow-right-linear" />}
          >
            View All
          </Button>
        </div>

        <Table
          aria-label="Example table with custom cells"
          className="bg-content1 rounded-2xl shadow-sm border border-default-100"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "action" ? "center" : "start"}
                className="text-xs uppercase text-default-500 font-semibold bg-default-50/50"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer hover:bg-default-50 transition-colors border-b border-default-50 last:border-none"
              >
                {(columnKey) => (
                  <TableCell className="py-3">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4 px-1">
          <p className="text-small text-default-500">
            Showing 4 of 12 new registrations
          </p>
          <Pagination
            isCompact
            showControls
            total={3}
            initialPage={1}
            variant="light"
            classNames={{
              cursor: "bg-primary text-white font-bold",
            }}
          />
        </div>
      </div>
    </div>
  );
}
