"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  Switch,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import StatsCard from "@/components/StatsCard"; // Giả sử bạn lưu component StatsCard ở đây

// ============================================================================
// 1. MOCK DATA
// ============================================================================

const pickups = [
  { id: 1, name: "Alex Johnson", car: "VF9 - ABC-123", time: "10:30 AM" },
  { id: 2, name: "Charles Davis", car: "VF8 - DEF-456", time: "11:15 AM" },
  { id: 3, name: "Emily White", car: "VFe34 - GHI-789", time: "12:00 PM" },
];

const returns = [
  { id: 1, name: "Brenda Smith", car: "VFe34 - XYZ-789", time: "11:00 AM" },
  { id: 2, name: "Diana Prince", car: "VF9 - WONDER-1", time: "12:30 PM" },
  { id: 3, name: "Frank Castle", car: "VF8 - PUNISH-1", time: "2:00 PM" },
];

const maintenance = [
  { id: 1, car: "VF8 - MNO-456", status: "Charging", type: "charging" },
  { id: 2, car: "VFe34 - PQR-789", status: "Tire Check", type: "maintenance" },
  { id: 3, car: "VF9 - STU-012", status: "Cleaning", type: "cleaning" },
];

const UploadZone = ({
  label,
  icon,
  isHighlighted = false,
  className = "",
}: {
  label: string;
  icon: string;
  isHighlighted?: boolean;
  className?: string;
}) => (
  <div
    className={`
      flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all
      ${
        isHighlighted
          ? "bg-primary-500 border-primary-500 text-primary-500"
          : "bg-default-300 border-default-100/20 text-default-800 hover:bg-default-500"
      }
      ${className}
    `}
  >
    <Icon icon={icon} className="text-3xl mb-2" />
    <span className="font-semibold text-sm">{label}</span>
    <span className="text-xs opacity-70">Click or drag to upload</span>
  </div>
);

export default function OperationsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | number[]>(80);

  const handleStartHandover = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    onOpen();
  };

  return (
    <div className="">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Vehicles On-site"
            value="15"
            icon="solar:car-bold"
            iconColor="text-primary-500"
            iconBg="bg-primary-500/10"
          />
          <StatsCard
            title="Departing Today"
            value="4"
            icon="solar:arrow-right-up-bold"
            iconColor="text-success-500"
            iconBg="bg-success-500/10"
          />
          <StatsCard
            title="Arriving Today"
            value="3"
            icon="solar:arrow-right-down-bold"
            iconColor="text-purple-500"
            iconBg="bg-purple-500/10"
          />
          <StatsCard
            title="Issues Reported"
            value="1"
            icon="solar:danger-circle-bold"
            iconColor="text-warning-500"
            iconBg="bg-warning-500/10"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-lg">Ready for Pickup</h3>
              <div className="w-6 h-6 rounded bg-success-500 text-black flex items-center justify-center text-xs font-bold">
                3
              </div>
            </div>

            {pickups.map((item) => (
              <Card key={item.id}>
                <CardBody className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-base">{item.name}</p>
                      <p className="text-default-600 text-sm mt-1">
                        {item.car}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-success-500 font-medium text-sm">
                      <Icon icon="solar:clock-circle-bold" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <Button
                    className="font-bold"
                    variant="shadow"
                    color="success"
                    onPress={() => handleStartHandover(item)}
                  >
                    Start Handover
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-lg">Expected Returns</h3>
              <div className="w-6 h-6 rounded bg-success-500 text-black flex items-center justify-center text-xs font-bold">
                3
              </div>
            </div>

            {returns.map((item) => (
              <Card key={item.id}>
                <CardBody className="p-5 flex flex-col justify-center h-[132px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-base">{item.name}</p>
                      <p className="text-default-600 text-sm mt-1">
                        {item.car}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-purple-400 font-medium text-sm">
                      <Icon icon="solar:clock-circle-bold" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-lg">Maintenance/Charging</h3>
              <div className="w-6 h-6 rounded bg-success-500 text-black flex items-center justify-center text-xs font-bold">
                3
              </div>
            </div>

            {maintenance.map((item) => {
              let chipIcon = "";
              let chipClass = "";

              if (item.type === "charging") {
                chipIcon = "solar:bolt-bold";
                chipClass = "bg-blue-500/20 text-blue-400 border-blue-500/20";
              } else if (item.type === "maintenance") {
                chipIcon = "solar:wrench-bold";
                chipClass =
                  "bg-orange-500/20 text-orange-400 border-orange-500/20";
              } else {
                chipIcon = "solar:broom-bold";
                chipClass =
                  "bg-purple-500/20 text-purple-400 border-purple-500/20";
              }

              return (
                <Card key={item.id}>
                  <CardBody className="p-5 h-[100px] flex-row justify-between items-center">
                    <div>
                      <p className="font-bold text-base">{item.car}</p>
                      <p className="text-default-600 text-xs mt-1">
                        Status: {item.status}
                      </p>
                    </div>

                    <Chip
                      startContent={<Icon icon={chipIcon} />}
                      variant="flat"
                      className={`border ${chipClass} px-2 h-8`}
                      classNames={{ content: "font-semibold text-xs" }}
                    >
                      {item.type === "charging"
                        ? "Charging"
                        : item.type === "maintenance"
                        ? "Maintenance"
                        : "Cleaning"}
                    </Chip>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        classNames={{
          header: "border-b border-default-300",
          footer: "border-t border-default-300",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">
                  Handover Confirmation - {selectedVehicle?.car || "Vehicle"}
                </h3>
              </ModalHeader>

              <ModalBody className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm text-default-600 mb-2 block">
                        Current Odometer (km)
                      </label>
                      <Input
                        type="number"
                        defaultValue="24500"
                        classNames={{
                          input: "font-bold",
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm text-default-600">
                          Current Battery %
                        </label>
                        <span className="font-bold text-success-500">
                          {batteryLevel}%
                        </span>
                      </div>
                      <Slider
                        aria-label="Battery Level"
                        step={1}
                        maxValue={100}
                        minValue={0}
                        value={batteryLevel}
                        onChange={setBatteryLevel}
                        color="primary"
                      />
                    </div>

                    <Divider className="bg-default-200" />

                    <div>
                      <h4 className="font-bold mb-3">Handover Checklist</h4>
                      <div className="flex flex-col gap-3">
                        <Checkbox
                          defaultSelected
                          classNames={{ label: "text-default-600" }}
                        >
                          Key Fob
                        </Checkbox>
                        <Checkbox
                          defaultSelected
                          classNames={{ label: "text-default-600" }}
                        >
                          Charging Cable
                        </Checkbox>
                        <Checkbox classNames={{ label: "text-default-600" }}>
                          Vehicle Documents
                        </Checkbox>
                        <Checkbox
                          defaultSelected
                          classNames={{ label: "text-default-600" }}
                        >
                          Interior/Exterior Cleanliness
                        </Checkbox>
                      </div>
                    </div>

                    <Divider className="bg-default-200" />

                    {/* Report Issue */}
                    <div className="p-4 rounded-xl border border-default-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold ">New Scratches/Damage</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-warning">
                            Report Issue
                          </span>
                          <Switch size="sm" color="warning" />
                        </div>
                      </div>
                      <Textarea
                        placeholder="Describe any new damage found on the vehicle..."
                        minRows={3}
                        classNames={{
                          input: "text-default-800",
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold mb-2">Upload Evidence</h4>

                    <div className="grid grid-cols-1 gap-4">
                      <UploadZone
                        label="Front"
                        icon="solar:car-linear"
                        className="h-32"
                      />
                      <UploadZone
                        label="Back"
                        icon="solar:car-linear"
                        className="h-32"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <UploadZone
                          label="Left Side"
                          icon="solar:car-linear"
                          className="h-32"
                        />
                        <UploadZone
                          label="Right Side"
                          icon="solar:car-linear"
                          className="h-32"
                        />
                      </div>

                      <UploadZone
                        label="Dashboard Photo"
                        icon="solar:speedometer-linear"
                        isHighlighted={true}
                        className="h-40 bg-primary-500/10 border-primary-500/50 text-primary-400"
                      />
                      <p className="text-center text-xs text-primary-400/70 -mt-2">
                        Odometer & Battery Evidence
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className=" font-bold"
                  variant="shadow"
                  color="primary"
                  onPress={onClose}
                >
                  Confirm Handover
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
