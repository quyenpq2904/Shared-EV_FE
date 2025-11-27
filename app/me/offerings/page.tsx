"use client";

import DataTable, { Column } from "@/components/DataTable";
import { formatCurrency } from "@/lib/utils/currency";
import { IOffering } from "@/types/Offering";
import { Button, Chip, Image, Input, Tab, Tabs, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCallback, useState } from "react";

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

const columns: Column[] = [
  { name: "EV MODEL", uid: "model" },
  { name: "SHARES", uid: "shares" },
  { name: "PRICE / SHARE", uid: "price" },
  { name: "TOTAL VALUE", uid: "total" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions", align: "center" },
];

const statusColorMap: Record<
  string,
  "success" | "warning" | "primary" | "default"
> = {
  active: "success",
  pending: "warning",
  sold: "primary",
  draft: "default",
};

function OfferingsPage() {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | number>("all");
  const [page, setPage] = useState(1);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["offerings", page],
  //   queryFn: () => fetchOfferings({ page, limit: 10 }),
  // });

  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {
      case "model":
        return (
          <div className="flex items-center gap-4">
            <div className="w-14 h-10 relative rounded-lg overflow-hidden bg-default-100 shrink-0">
              <Image
                removeWrapper
                alt={item.model}
                className="w-full h-full object-cover"
                src={item.image}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-small font-bold text-default-900">
                {item.model}
              </p>
              <p className="text-tiny text-default-600">{item.description}</p>
            </div>
          </div>
        );
      case "shares":
        return (
          <div className="text-small text-default-700">
            {item.sharesSold} / {item.totalShares}
          </div>
        );
      case "price":
        return (
          <div className="text-small text-default-700 font-medium">
            {formatCurrency(item.pricePerShare)}
          </div>
        );
      case "total":
        return (
          <div className="text-small font-bold text-default-900">
            {formatCurrency(item.totalValue)}
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="View Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Icon icon="solar:eye-linear" />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Icon icon="solar:pen-new-square-linear" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Icon icon="solar:trash-bin-trash-linear" />
              </span>
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
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-default-900">
            My EV Share Offerings
          </h1>
          <p className="text-default-600">
            Manage, edit, and track the status of all your vehicle share
            listings.
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
            <Tabs
              aria-label="Status Filter"
              selectedKey={statusFilter}
              onSelectionChange={setStatusFilter}
            >
              <Tab key="all" title="All Offerings" />
              <Tab key="active" title="Active" />
              <Tab key="pending" title="Pending" />
              <Tab key="sold" title="Sold Out" />
              <Tab key="draft" title="Draft" />
            </Tabs>

            <div className="flex gap-4">
              <Input
                isClearable
                className="w-full sm:max-w-[300px]"
                placeholder="Search offerings..."
                startContent={
                  <Icon
                    icon="solar:magnifer-linear"
                    className="text-default-400"
                  />
                }
                value={filterValue}
                onClear={() => setFilterValue("")}
                onValueChange={setFilterValue}
                variant="bordered"
                classNames={{ inputWrapper: "border-default-300" }}
              />
              <Button
                className="min-w-28"
                startContent={
                  <Icon icon="solar:add-circle-bold" className="text-xl" />
                }
                variant="flat"
                color="success"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
        <DataTable<IOffering>
          columns={columns}
          data={mockOfferings}
          renderCell={renderCell}
          page={page}
          totalPages={1}
          totalItems={4}
          onPageChange={(newPage) => setPage(newPage)}
          // isLoading={isLoading}
        />
      </div>
    </div>
  );
}
export default OfferingsPage;
