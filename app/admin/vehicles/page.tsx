"use client";

import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Selection,
  Button,
  Chip,
  User,
  Image,
  Textarea,
  Tabs,
  Tab,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState, useMemo, Key } from "react";
import DataTable, { Column } from "@/components/DataTable";

interface Listing {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  vehicleName: string;
  sharePercentage: number;
  userPrice: number;
  aiPrice: number;
  submissionDate: string;
  status: "PENDING" | "VALIDATING" | "OWNERSHIP-TRANSFERING" | "AVAILABLE";
  image: string;
  // New Specification Fields
  registrationYear: number;
  gearshift: "Automatic" | "Manual"; // Mostly Automatic for EVs
  condition: "New" | "Used";
  vehicleType: string;
  seats: number;
  certificateType: string;
  exteriorColor: string;
  interiorColor: string;
  power: string; // e.g., "300 kW"
  emptyWeight: string; // e.g., "2200 kg"
  kilometre: number;

  batterySoh: number; // Status of Health %
  // New Pricing Fields
  listingPrice: number; // Total value e.g. 1.2 Billion
  pricePerShare: number;
  totalShares: number;
  minShare: number;
}

const listings: Listing[] = [
  {
    id: "1",
    userId: "12345",
    userName: "David Nguyen",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    vehicleName: "VinFast VF8 Plus",
    sharePercentage: 10,
    userPrice: 120,
    aiPrice: 118,
    submissionDate: "2023-10-26",
    status: "PENDING",
    image:
      "https://images.unsplash.com/photo-1669910547700-1c045b849319?q=80&w=800&auto=format&fit=crop",
    registrationYear: 2023,
    gearshift: "Automatic",
    condition: "Used",
    vehicleType: "SUV",
    seats: 5,
    certificateType: "Private",
    exteriorColor: "Red",
    interiorColor: "Beige",
    power: "300 kW",
    emptyWeight: "2540 kg",
    kilometre: 15000,
    batterySoh: 98,
    listingPrice: 120000,
    pricePerShare: 120,
    totalShares: 1000,
    minShare: 10,
  },
  {
    id: "2",
    userId: "67890",
    userName: "Sarah Jenkins",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    vehicleName: "Tesla Model Y Performance",
    sharePercentage: 5,
    userPrice: 210,
    aiPrice: 212,
    submissionDate: "2023-10-25",
    status: "VALIDATING",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop",
    registrationYear: 2023,
    gearshift: "Automatic",
    condition: "Used",
    vehicleType: "SUV",
    seats: 5,
    certificateType: "Private",
    exteriorColor: "Red",
    interiorColor: "Black",
    power: "336 kW",
    emptyWeight: "1995 kg",
    kilometre: 8000,
    batterySoh: 99,
    listingPrice: 210000,
    pricePerShare: 210,
    totalShares: 8,
    minShare: 5,
  },
  {
    id: "3",
    userId: "11223",
    userName: "Michael Chen",
    userAvatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    vehicleName: "Hyundai Ioniq 5",
    sharePercentage: 15,
    userPrice: 180,
    aiPrice: 175,
    submissionDate: "2023-10-24",
    status: "OWNERSHIP-TRANSFERING",
    image:
      "https://images.unsplash.com/photo-1662124508216-17b545464455?q=80&w=800&auto=format&fit=crop",
    registrationYear: 2022,
    gearshift: "Automatic",
    condition: "Used",
    vehicleType: "Crossover",
    seats: 5,
    certificateType: "Commercial",
    exteriorColor: "Silver",
    interiorColor: "Grey",
    power: "225 kW",
    emptyWeight: "2100 kg",
    kilometre: 25000,
    batterySoh: 95,
    listingPrice: 180000,
    pricePerShare: 180,
    totalShares: 1000,
    minShare: 15,
  },
  {
    id: "4",
    userId: "44556",
    userName: "Emily Davis",
    userAvatar: "https://i.pravatar.cc/150?u=a048581f4e29026024d",
    vehicleName: "Kia EV6 GT-Line",
    sharePercentage: 10,
    userPrice: 150,
    aiPrice: 152,
    submissionDate: "2023-10-23",
    status: "AVAILABLE",
    image:
      "https://images.unsplash.com/photo-1678201256338-7f465d625573?q=80&w=800&auto=format&fit=crop",
    registrationYear: 2023,
    gearshift: "Automatic",
    condition: "Used",
    vehicleType: "Crossover",
    seats: 5,
    certificateType: "Private",
    exteriorColor: "Grey",
    interiorColor: "Black",
    power: "239 kW",
    emptyWeight: "2050 kg",
    kilometre: 12000,
    batterySoh: 97,
    listingPrice: 150000,
    pricePerShare: 150,
    totalShares: 1000,
    minShare: 10,
  },
  {
    id: "5",
    userId: "77889",
    userName: "Robert Wilson",
    userAvatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    vehicleName: "Ford Mustang Mach-E",
    sharePercentage: 8,
    userPrice: 250,
    aiPrice: 245,
    submissionDate: "2023-10-22",
    status: "PENDING",
    image:
      "https://images.unsplash.com/photo-1620882006323-936630f9525c?q=80&w=800&auto=format&fit=crop",
    registrationYear: 2023,
    gearshift: "Automatic",
    condition: "New",
    vehicleType: "SUV",
    seats: 5,
    certificateType: "Private",
    exteriorColor: "Blue",
    interiorColor: "White",
    power: "258 kW",
    emptyWeight: "2200 kg",
    kilometre: 500,
    batterySoh: 100,
    listingPrice: 250000,
    pricePerShare: 250,
    totalShares: 1000,
    minShare: 8,
  },
];

const columns: Column[] = [
  { name: "No.", uid: "no" },
  { name: "Vehicle Name", uid: "vehicleName", sortable: true },
  { name: "Owner Name", uid: "userName", sortable: true },
  { name: "Submission Date", uid: "submissionDate", sortable: true },
  { name: "Status", uid: "status", sortable: true },
];

const statusColorMap: Record<
  string,
  "warning" | "primary" | "secondary" | "success" | "danger" | "default"
> = {
  PENDING: "warning",
  VALIDATING: "primary",
  "OWNERSHIP-TRANSFERING": "secondary",
  AVAILABLE: "success",
};

export default function VehiclesPage() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const selectedListing = useMemo(() => {
    if (selectedKeys === "all") return null;
    const selectedId = Array.from(selectedKeys)[0];
    return listings.find((item) => item.id === selectedId) || null;
  }, [selectedKeys]);

  const renderCell = (item: Listing, columnKey: Key) => {
    switch (columnKey) {
      case "no":
        return (
          <div className="text-default-600">{listings.indexOf(item) + 1}</div>
        );
      case "vehicleName":
        return (
          <div className="font-semibold text-default-900">
            {item.vehicleName}
          </div>
        );
      case "userName":
        return (
          <User
            name={item.userName}
            description={item.userId}
            avatarProps={{
              src: item.userAvatar,
              size: "sm",
            }}
          />
        );
      case "status":
        return (
          <Chip
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
            className="capitalize"
          >
            {item.status.toLowerCase().replace("-", " ")}
          </Chip>
        );
      case "submissionDate":
        return (
          <div className="text-default-700 text-sm">{item.submissionDate}</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] overflow-hidden gap-6">
      <div className="flex-1 flex flex-col min-w-[500px]">
        {/* --- Header with Buttons --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-default-900">
              Registered Vehicles List
            </h1>
            <p className="text-default-500">
              Review and approve newly registered vehicles in the system.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="flat"
              className="bg-default-100 font-medium text-default-700"
              startContent={<Icon icon="solar:export-linear" />}
            >
              Export Data
            </Button>
            <Button
              color="primary"
              className="font-medium shadow-lg shadow-primary/20"
              startContent={<Icon icon="solar:add-circle-bold" />}
            >
              Manual Registration
            </Button>
          </div>
        </div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm border border-default-200">
            <CardBody className="p-4">
              <p className="text-default-500 font-medium text-sm">
                Total Vehicles
              </p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-3xl font-bold text-default-900">
                  1,254
                </span>
                <Chip
                  color="success"
                  variant="flat"
                  size="sm"
                  classNames={{ content: "font-semibold px-1" }}
                >
                  ↑ 12%
                </Chip>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm border border-l-4 border-l-warning border-y-default-200 border-r-default-200">
            <CardBody className="p-4">
              <p className="text-default-500 font-medium text-sm">
                Pending Approval
              </p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-3xl font-bold text-default-900">45</span>
                <Chip
                  color="warning"
                  variant="flat"
                  size="sm"
                  classNames={{ content: "font-semibold px-1" }}
                >
                  +5 today
                </Chip>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm border border-l-4 border-l-success border-y-default-200 border-r-default-200">
            <CardBody className="p-4">
              <p className="text-default-500 font-medium text-sm">Approved</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-3xl font-bold text-default-900">
                  1,180
                </span>
                <Chip
                  color="success"
                  variant="flat"
                  size="sm"
                  classNames={{ content: "font-semibold px-1" }}
                >
                  +10%
                </Chip>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm border border-default-200">
            <CardBody className="p-4">
              <p className="text-default-500 font-medium text-sm">Rejected</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-3xl font-bold text-default-900">29</span>
                <Chip
                  color="danger"
                  variant="flat"
                  size="sm"
                  classNames={{ content: "font-semibold px-1" }}
                >
                  -2%
                </Chip>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="flex gap-4 mb-4">
          <Input
            className="w-full flex-1"
            placeholder="Search by vehicle, owner..."
            startContent={<Icon icon="solar:magnifer-linear" />}
            size="sm"
          />
          <Select
            placeholder="Status: All"
            className="w-48"
            size="sm"
            defaultSelectedKeys={["all"]}
          >
            <SelectItem key="all">All</SelectItem>
            <SelectItem key="PENDING">Pending</SelectItem>
            <SelectItem key="VALIDATING">Validating</SelectItem>
            <SelectItem key="OWNERSHIP-TRANSFERING">
              Ownership Transfering
            </SelectItem>
            <SelectItem key="AVAILABLE">Available</SelectItem>
          </Select>
          <Button
            variant="flat"
            size="sm"
            endContent={<Icon icon="solar:calendar-linear" />}
          >
            Date Range
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          <DataTable
            columns={columns}
            data={listings}
            renderCell={renderCell}
            selectionMode="single"
            onSelectionChange={setSelectedKeys}
            showPagination={true}
          />
        </div>
      </div>

      <div className="w-[400px] border-l border-default-200 pl-6 hidden xl:flex flex-col">
        {selectedListing ? (
          <Card className="h-full shadow-none border-none bg-transparent">
            <div className="relative w-full h-56 overflow-hidden rounded-xl bg-default-100 mb-6">
              <Image
                removeWrapper
                alt={selectedListing.vehicleName}
                className="z-0 w-full h-full object-cover"
                src={selectedListing.image}
              />
            </div>

            <CardBody className="px-0 py-0 flex flex-col gap-6 overflow-y-auto">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedListing.vehicleName}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-default-500">
                    Submitted on {selectedListing.submissionDate}
                  </p>
                  <Chip
                    color={statusColorMap[selectedListing.status]}
                    size="sm"
                    variant="flat"
                    className="mt-2 capitalize"
                  >
                    {selectedListing.status}
                  </Chip>
                </div>
              </div>

              <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-primary",
                  tab: "max-w-fit px-0 h-12",
                  tabContent: "group-data-[selected=true]:text-primary",
                }}
              >
                <Tab
                  key="basic-info"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Basic Info</span>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="font-semibold text-default-900 mb-3">
                        Basic Information
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm bg-default-50 p-4 rounded-xl border border-default-100">
                        <div className="flex flex-col">
                          <span className="text-default-500">
                            Listing Price
                          </span>
                          <span className="font-semibold text-lg text-primary">
                            ${selectedListing.listingPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">
                            Price / Share
                          </span>
                          <span className="font-medium text-default-900">
                            ${selectedListing.pricePerShare}
                          </span>
                        </div>
                        <div className="flex flex-col mt-2">
                          <span className="text-default-500">Total Shares</span>
                          <span className="font-medium text-default-900">
                            {selectedListing.totalShares.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col mt-2">
                          <span className="text-default-500">Min Share</span>
                          <span className="font-medium text-default-900">
                            {selectedListing.minShare}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab
                  key="details"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Vehicle Details</span>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-6">
                    {/* Vehicle Specifications */}
                    <div className="">
                      <h3 className="font-semibold text-default-900 mb-3">
                        Specifications
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-default-500">
                            Registration Year
                          </span>
                          <span className="font-medium text-default-700">
                            {selectedListing.registrationYear}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Condition</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.condition}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Mileage</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.kilometre.toLocaleString()} km
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">
                            Battery Health
                          </span>
                          <span
                            className={`font-medium ${
                              selectedListing.batterySoh >= 90
                                ? "text-success"
                                : "text-warning"
                            }`}
                          >
                            {selectedListing.batterySoh}%
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Power</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.power}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Weight</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.emptyWeight}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Vehicle Type</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.vehicleType}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Seats</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.seats}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Gearshift</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.gearshift}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Certificate</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.certificateType}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Exterior</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.exteriorColor}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-default-500">Interior</span>
                          <span className="font-medium text-default-700">
                            {selectedListing.interiorColor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  key="documents"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Documents</span>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-4">
                    <div className="p-4 rounded-lg bg-default-100 flex items-center justify-between group cursor-pointer hover:bg-default-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="solar:file-text-bold"
                          className="text-2xl text-primary"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            Registration Certificate
                          </span>
                          <span className="text-xs text-default-500">
                            PDF • 2.5 MB
                          </span>
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <Icon
                          icon="solar:download-linear"
                          className="text-xl"
                        />
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-default-100 flex items-center justify-between group cursor-pointer hover:bg-default-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="solar:shield-check-bold"
                          className="text-2xl text-success"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            Insurance Policy
                          </span>
                          <span className="text-xs text-default-500">
                            PDF • 1.8 MB
                          </span>
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <Icon
                          icon="solar:download-linear"
                          className="text-xl"
                        />
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-default-100 flex items-center justify-between group cursor-pointer hover:bg-default-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="solar:gallery-bold"
                          className="text-2xl text-warning"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            Vehicle Images
                          </span>
                          <span className="text-xs text-default-500">
                            ZIP • 15.2 MB
                          </span>
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <Icon
                          icon="solar:download-linear"
                          className="text-xl"
                        />
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-default-100 flex items-center justify-between group cursor-pointer hover:bg-default-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="solar:history-bold"
                          className="text-2xl text-secondary"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            Service History
                          </span>
                          <span className="text-xs text-default-500">
                            PDF • 4.1 MB
                          </span>
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <Icon
                          icon="solar:download-linear"
                          className="text-xl"
                        />
                      </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>

              <div className="flex flex-col gap-3 mt-auto pt-6">
                <Textarea
                  label="Rejection Feedback (Optional)"
                  placeholder="Provide a reason for rejection..."
                  variant="bordered"
                  labelPlacement="outside"
                  classNames={{
                    label: "text-default-700 font-medium",
                  }}
                />
                <div className="flex gap-3">
                  <Button
                    fullWidth
                    variant="flat"
                    color="danger"
                    startContent={<Icon icon="lucide:x" />}
                  >
                    Reject
                  </Button>
                  <Button
                    fullWidth
                    color="primary"
                    startContent={<Icon icon="lucide:check" />}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-default-400">
            <Icon
              icon="solar:folder-open-linear"
              className="text-6xl mb-4 opacity-50"
            />
            <p className="text-xl font-medium">Select a vehicle</p>
            <p className="text-sm">to view detailed information</p>
          </div>
        )}
      </div>
    </div>
  );
}
