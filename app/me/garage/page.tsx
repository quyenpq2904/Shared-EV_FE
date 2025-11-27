"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { IVehicle } from "@/types/Vehicle";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Input,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export const garageVehicles: IVehicle[] = [
  {
    id: "1",
    year: 2023,
    make: "Tesla",
    model: "Model Y",
    trim: "Long Range AWD",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
    status: "listed",
    sharesOffered: "10 / 10",
    sharesSold: 4,
    totalValue: 50000,
  },
  {
    id: "2",
    year: 2022,
    make: "Rivian",
    model: "R1T",
    trim: "Adventure Package",
    image:
      "https://images.unsplash.com/photo-1669649514436-09259795cf58?q=80&w=1000&auto=format&fit=crop",
    status: "pending",
    estMarketValue: 75000,
    description:
      "Vehicle details are under review. You'll be notified once you can create an offering.",
  },
  {
    id: "3",
    year: 2023,
    make: "Ford",
    model: "Mustang Mach-E",
    trim: "Premium AWD",
    image:
      "https://images.unsplash.com/photo-1696599622732-d304443939d2?q=80&w=1000&auto=format&fit=crop",
    status: "available",
    estMarketValue: 48000,
    description:
      "This vehicle is ready for co-ownership. Create a share offering to get started.",
  },
];

const StatusBadge = ({ status }: { status: IVehicle["status"] }) => {
  const config = {
    listed: { color: "success", label: "Listed" },
    pending: { color: "warning", label: "Pending" },
    available: { color: "primary", label: "Available" },
  } as const;

  const { color, label } = config[status];

  return (
    <Chip
      color={color}
      variant="flat"
      size="sm"
      classNames={{
        base: "px-2 gap-1.5",
        content: "font-medium",
      }}
      startContent={<div className="w-1.5 h-1.5 rounded-full bg-current" />}
    >
      {label}
    </Chip>
  );
};

function MyGaragePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-light mb-1">My Garage</h1>
          <p className="text-default-600">
            Manage your electric vehicle listings and share offerings.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Input
            placeholder="Search vehicles..."
            startContent={<Icon icon="solar:magnifer-linear" />}
            variant="bordered"
          />
          <Button
            color="success"
            variant="flat"
            startContent={<Icon icon="solar:add-circle-bold" width={28} />}
            className="min-w-36"
          >
            Add Vehicle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {garageVehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <div className="p-4 pb-0">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/20">
                <Image
                  removeWrapper
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  src={vehicle.image}
                />
              </div>
            </div>

            <CardBody className="px-5 py-5 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-tight">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-default-600 text-sm mt-1">
                    {vehicle.trim}
                  </p>
                </div>
                <StatusBadge status={vehicle.status} />
              </div>
              <div className="mt-2 space-y-3 min-h-[100px]">
                {vehicle.status === "listed" ? (
                  <div className="text-default-600">
                    <div className="flex justify-between text-sm">
                      <span>Shares Offered</span>
                      <span>{vehicle.sharesOffered}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shares Sold</span>
                      <span className="font-semibold">
                        {vehicle.sharesSold}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm items-center pt-1">
                      <span>Total Value</span>
                      <span className="text-[#00E396] font-bold text-base">
                        {formatCurrency(vehicle.totalValue || 0)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-default-600">
                        Est. Market Value
                      </span>
                      <span className="text-white font-bold">
                        {formatCurrency(vehicle.estMarketValue || 0)}
                      </span>
                    </div>
                    <p className="text-sm text-default-600 leading-relaxed">
                      {vehicle.description}
                    </p>
                  </>
                )}
              </div>
            </CardBody>

            <CardFooter className="px-5 pb-5 pt-0 flex gap-3">
              <Button
                variant="light"
                startContent={
                  <Icon
                    icon={
                      vehicle.status === "pending"
                        ? "solar:eye-linear"
                        : "solar:pen-linear"
                    }
                  />
                }
              >
                {vehicle.status === "pending" ? "Details" : "Edit"}
              </Button>

              {vehicle.status === "available" ? (
                <Button className="flex-1 font-semibold" color="success">
                  Create Offering
                </Button>
              ) : (
                <Button className="flex-1 font-semibold">
                  {vehicle.status === "listed"
                    ? "Manage Offering"
                    : "Complete Listing"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MyGaragePage;
