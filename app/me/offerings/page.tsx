"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { IOffering, OfferingStatus } from "@/types/Offering";
import {
  Button,
  Chip,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCallback } from "react";

export const mockOfferings: IOffering[] = [
  {
    id: "1",
    model: "2023 Tesla Model Y",
    description: "Weekend & Holiday Share",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
    sharesSold: 10,
    totalShares: 20,
    pricePerShare: 5000,
    totalValue: 100000,
    status: "active",
  },
  {
    id: "2",
    model: "2022 Audi e-tron GT",
    description: "Weekday Commuter Share",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop",
    sharesSold: 5,
    totalShares: 15,
    pricePerShare: 8500,
    totalValue: 127500,
    status: "pending",
  },
  {
    id: "3",
    model: "2023 Ford Mustang Mach-E",
    description: "Full Access Share",
    image:
      "https://images.unsplash.com/photo-1696599622732-d304443939d2?q=80&w=1000&auto=format&fit=crop",
    sharesSold: 25,
    totalShares: 25,
    pricePerShare: 2200,
    totalValue: 55000,
    status: "sold",
  },
  {
    id: "4",
    model: "2021 Porsche Taycan",
    description: "Executive Travel Share",
    image:
      "https://images.unsplash.com/photo-1614207212035-c5432d677688?q=80&w=1000&auto=format&fit=crop",
    sharesSold: 0,
    totalShares: 10,
    pricePerShare: 15000,
    totalValue: 150000,
    status: "draft",
  },
];

const columns = [
  { name: "EV MODEL", uid: "model" },
  { name: "SHARES", uid: "shares" },
  { name: "PRICE / SHARE", uid: "price" },
  { name: "TOTAL VALUE", uid: "total" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<
  OfferingStatus,
  "success" | "warning" | "primary" | "default"
> = {
  active: "success",
  pending: "warning",
  sold: "primary",
  draft: "default",
};

function OfferingsPage() {
  const renderCell = useCallback((item: IOffering, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof IOffering];

    switch (columnKey) {
      case "model":
        return (
          <div className="flex items-center gap-4">
            <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-default-100 shrink-0">
              <Image
                removeWrapper
                alt={item.model}
                className="w-full h-full object-cover"
                src={item.image}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-white">{item.model}</p>
              <p className="text-xs text-default-400">{item.description}</p>
            </div>
          </div>
        );
      case "shares":
        return (
          <div className="text-sm text-white font-medium">
            {item.sharesSold} / {item.totalShares}
          </div>
        );
      case "price":
        return (
          <div className="text-sm text-white font-medium">
            {formatCurrency(item.pricePerShare)}
          </div>
        );
      case "total":
        return (
          <div className="text-sm text-white font-bold">
            {formatCurrency(item.totalValue)}
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none"
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
            classNames={{
              content: "font-semibold text-xs px-2",
            }}
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="View Details" className="text-black">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-default-400 hover:text-white"
              >
                <Icon icon="solar:eye-linear" className="text-lg" />
              </Button>
            </Tooltip>
            <Tooltip content="Edit Listing" className="text-black">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-default-400 hover:text-white"
              >
                <Icon icon="solar:pen-new-square-linear" className="text-lg" />
              </Button>
            </Tooltip>
            <Tooltip content="Delete" color="danger">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-default-400 hover:text-danger"
              >
                <Icon icon="solar:trash-bin-trash-linear" className="text-lg" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-centergap-4">
        <div>
          <h1 className="text-3xl font-light mb-1">My EV Share Offerings</h1>
          <p className="text-default-600">
            Manage, edit, and track the status of all your vehicle share
            listings.
          </p>
        </div>
        <Button
          className=""
          startContent={
            <Icon icon="solar:add-circle-bold" className="text-xl" />
          }
          variant="flat"
          color="success"
        >
          Create New Offering
        </Button>
      </div>

      <Table
        aria-label="Offerings Table"
        classNames={{
          wrapper: "bg-transparent border-none shadow-none p-0",
          th: "bg-[#122321] text-default-400 font-semibold uppercase text-xs py-4 first:rounded-l-xl last:rounded-r-xl", // Style Header xanh rêu đậm
          td: "py-4 border-b border-default-100/10 group-last:border-none",
          table: "border-separate border-spacing-y-2",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={
                column.uid === "actions" || column.uid === "status"
                  ? "center"
                  : "start"
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={mockOfferings}>
          {(item) => (
            <TableRow
              key={item.id}
              className="hover:bg-white/5 transition-colors rounded-xl"
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* --- FOOTER / PAGINATION --- */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-default-100/10">
        <span className="text-small text-default-400">
          Showing 1 to 4 of 4 results
        </span>
        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="flat"
            className="bg-[#122321] text-default-400 h-9 w-9 rounded-lg"
          >
            <Icon icon="solar:alt-arrow-left-linear" />
          </Button>
          <Button
            isIconOnly
            variant="solid"
            className="bg-[#00E396] text-black font-bold h-9 w-9 rounded-lg"
          >
            1
          </Button>
          <Button
            isIconOnly
            variant="flat"
            className="bg-[#122321] text-default-400 h-9 w-9 rounded-lg"
          >
            <Icon icon="solar:alt-arrow-right-linear" />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default OfferingsPage;
