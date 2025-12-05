"use client";

import { Icon } from "@iconify/react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Progress,
} from "@heroui/react";

// Định nghĩa kiểu dữ liệu cho Station
interface Station {
  id: string;
  name: string;
  status: "Operational" | "Maintenance" | "Offline";
  slotsUsed: number;
  totalSlots: number;
  staffActive: number;
  dailyRevenue: number;
  carsAvailable: number;
  mapImage?: string; // Trong thực tế sẽ là URL ảnh map
}

// Mock Data giống hệt hình ảnh
const stationsData: Station[] = [
  {
    id: "1",
    name: "Downtown Central Hub",
    status: "Operational",
    slotsUsed: 12,
    totalSlots: 20,
    staffActive: 3,
    dailyRevenue: 1250,
    carsAvailable: 8,
  },
  {
    id: "2",
    name: "Northside Supercharger",
    status: "Maintenance",
    slotsUsed: 18,
    totalSlots: 20,
    staffActive: 2,
    dailyRevenue: 980,
    carsAvailable: 2,
  },
  {
    id: "3",
    name: "East End Logistics",
    status: "Offline",
    slotsUsed: 0,
    totalSlots: 10,
    staffActive: 0,
    dailyRevenue: 0,
    carsAvailable: 0,
  },
  {
    id: "4",
    name: "Westgate Retail Park",
    status: "Operational",
    slotsUsed: 15,
    totalSlots: 15,
    staffActive: 2,
    dailyRevenue: 1890,
    carsAvailable: 0,
  },
  {
    id: "5",
    name: "Airport Charging Plaza",
    status: "Operational",
    slotsUsed: 25,
    totalSlots: 30,
    staffActive: 3,
    dailyRevenue: 2400,
    carsAvailable: 5,
  },
  {
    id: "6",
    name: "Southside Industrial",
    status: "Maintenance",
    slotsUsed: 8,
    totalSlots: 12,
    staffActive: 1,
    dailyRevenue: 450,
    carsAvailable: 4,
  },
];

const StationCard = ({ station }: { station: Station }) => {
  // Logic map status sang màu của HeroUI Chip
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "success";
      case "Maintenance":
        return "warning";
      case "Offline":
        return "danger";
      default:
        return "default";
    }
  };

  const progressPercentage = (station.slotsUsed / station.totalSlots) * 100;

  return (
    <Card radius="lg">
      <CardHeader className="flex justify-between items-start pb-0 pt-5 px-5">
        <div className="flex flex-col gap-2 items-start pr-4">
          <h3 className="font-bold text-lg leading-tight">{station.name}</h3>
          <Chip
            color={getStatusColor(station.status)}
            variant="flat"
            size="sm"
            classNames={{
              content: "font-semibold",
              base: "border border-opacity-20",
            }}
          >
            {station.status}
          </Chip>
        </div>
      </CardHeader>

      <CardBody className="py-4 px-5 gap-5 overflow-visible">
        <div>
          <div className="flex justify-between text-sm text-default-800 mb-2">
            <span>Parking Slots:</span>
            <span className="font-medium">
              {station.slotsUsed}/{station.totalSlots} Used
            </span>
          </div>
          <Progress
            aria-label="Parking slots usage"
            value={progressPercentage}
            className="max-w-md"
            size="sm"
            color="primary"
          />
        </div>

        <div className="flex items-center gap-3 border-b border-default-600 pb-4">
          <AvatarGroup
            isBordered
            max={3}
            size="sm"
            className="justify-start"
            renderCount={(count) => (
              <p className="text-tiny text-default-800 font-medium ml-2">
                +{count} others
              </p>
            )}
          >
            {[...Array(station.staffActive)].map((_, i) => (
              <Avatar
                key={i}
                icon={<Icon icon="lucide:user" width="14" height="14" />}
              />
            ))}
          </AvatarGroup>

          {station.staffActive === 0 ? (
            <span className="text-default-600 text-sm italic">
              0 Staff Active
            </span>
          ) : (
            <span className="text-default-800 text-sm">
              {station.staffActive} Staff Active
            </span>
          )}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-default-600 uppercase tracking-wider mb-1">
              Daily Revenue
            </p>
            <p className="text-xl font-bold ">
              ${station.dailyRevenue.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-default-600 uppercase tracking-wider mb-1">
              Cars Available
            </p>
            <p className="text-xl font-bold ">{station.carsAvailable}</p>
          </div>
        </div>
      </CardBody>

      <CardFooter className="pt-0 pb-5 px-5">
        <Button
          className="font-semibold"
          variant="shadow"
          fullWidth
          color="primary"
          size="lg"
          radius="md"
        >
          Manage Station
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function StationDashboard() {
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-semibold mb-6">Stations Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stationsData.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </div>
  );
}
