"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Progress,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface AddVehicleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddVehicleModal({
  isOpen,
  onOpenChange,
}: AddVehicleModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Mock form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    make: "",
    model: "",
    year: "",
    vin: "",
    seats: "",
    licensePlate: "",
    extColor: "",
    intColor: "",
    // Step 2: Tech Specs
    battery: "",
    range: "",
    power: "",
    topSpeed: "",
    acceleration: "",
    chargingTime: "",
    // Step 3: Owner Info
    ownerName: "",
    address: "",
    phone: "",
    email: "",
    idNumber: "",
    // Step 4: Documents (mock)
    photos: [],
  });

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (onClose: () => void) => {
    console.log("Submitting Vehicle Data:", formData);
    // TODO: Integrate backend submission here
    onClose();
    // Reset steps after closing
    setTimeout(() => setCurrentStep(0), 300);
  };

  const steps = [
    {
      title: "Basic Information",
      subtitle: "Essential details about your vehicle",
    },
    {
      title: "Technical Specs",
      subtitle: "Performance and capability metrics",
    },
    {
      title: "Owner Information",
      subtitle: "Contact and verification details",
    },
    {
      title: "Photos & Documents",
      subtitle: "Upload images and registration papers",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="4xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-background",
        header: "border-b border-default-100",
        footer: "border-t border-default-100",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold">Add New Vehicle</span>
                <span className="text-sm text-default-500">
                  Step {currentStep + 1} of 4
                </span>
              </div>
              <Progress
                size="sm"
                value={((currentStep + 1) / 4) * 100}
                color="secondary"
                className="w-full"
                aria-label="Form Progress"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-primary">
                  {steps[currentStep].title}
                </h3>
                <p className="text-sm text-default-500 font-normal">
                  {steps[currentStep].subtitle}
                </p>
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              {/* --- STEP 1: BASIC INFORMATION --- */}
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Make"
                    placeholder="Select Make"
                    selectedKeys={formData.make ? [formData.make] : []}
                    onSelectionChange={(keys) =>
                      setFormData({
                        ...formData,
                        make: Array.from(keys)[0] as string,
                      })
                    }
                  >
                    <SelectItem key="tesla">Tesla</SelectItem>
                    <SelectItem key="vinfast">VinFast</SelectItem>
                    <SelectItem key="porsche">Porsche</SelectItem>
                    <SelectItem key="bmw">BMW</SelectItem>
                  </Select>
                  <Select
                    label="Model"
                    placeholder="Select Model"
                    selectedKeys={formData.model ? [formData.model] : []}
                    onSelectionChange={(keys) =>
                      setFormData({
                        ...formData,
                        model: Array.from(keys)[0] as string,
                      })
                    }
                  >
                    <SelectItem key="model3">Model 3</SelectItem>
                    <SelectItem key="vf8">VF8</SelectItem>
                    <SelectItem key="taycan">Taycan</SelectItem>
                    <SelectItem key="i4">i4</SelectItem>
                  </Select>
                  <Input
                    label="Year of Manufacture"
                    placeholder="YYYY"
                    value={formData.year}
                    onValueChange={(val) =>
                      setFormData({ ...formData, year: val })
                    }
                  />
                  <Input
                    label="Registration Year"
                    placeholder="YYYY"
                    value={formData.year} // Reusing year for simplicity or add regYear to state if needed
                    onValueChange={(val) =>
                      setFormData({ ...formData, year: val })
                    }
                  />
                  <Input
                    label="Number of Seats"
                    placeholder="e.g. 5"
                    value={formData.seats}
                    onValueChange={(val) =>
                      setFormData({ ...formData, seats: val })
                    }
                  />
                  <Input
                    label="License Plate"
                    placeholder="e.g. 30A-123.45"
                    value={formData.licensePlate}
                    onValueChange={(val) =>
                      setFormData({ ...formData, licensePlate: val })
                    }
                  />
                  <Input
                    label="Exterior Color"
                    placeholder="Enter color"
                    value={formData.extColor}
                    onValueChange={(val) =>
                      setFormData({ ...formData, extColor: val })
                    }
                  />
                  <Input
                    label="Interior Color"
                    placeholder="Enter color"
                    value={formData.intColor}
                    onValueChange={(val) =>
                      setFormData({ ...formData, intColor: val })
                    }
                  />
                </div>
              )}

              {/* --- STEP 2: TECHNICAL SPECS --- */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-base font-semibold mb-4 text-default-700">
                      <Icon icon="solar:bolt-linear" /> Performance & Battery
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Battery Capacity"
                        placeholder="e.g. 75"
                        endContent={
                          <span className="text-default-400 text-sm">kWh</span>
                        }
                        value={formData.battery}
                        onValueChange={(val) =>
                          setFormData({ ...formData, battery: val })
                        }
                      />
                      <Input
                        label="Battery State of Health (SoH)"
                        placeholder="e.g. 98"
                        endContent={
                          <span className="text-default-400 text-sm">%</span>
                        }
                        // Mocking SoH in formData if needed, using battery for now to fix lint
                        onValueChange={() => {}}
                      />
                      <Input
                        label="Power Output"
                        placeholder="e.g. 150"
                        endContent={
                          <span className="text-default-400 text-sm">kW</span>
                        }
                        value={formData.power}
                        onValueChange={(val) =>
                          setFormData({ ...formData, power: val })
                        }
                      />
                      <Input
                        label="Driving Range"
                        placeholder="e.g. 450"
                        endContent={
                          <span className="text-default-400 text-sm">km</span>
                        }
                        value={formData.range}
                        onValueChange={(val) =>
                          setFormData({ ...formData, range: val })
                        }
                      />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="flex items-center gap-2 text-base font-semibold mb-4 text-default-700">
                      <Icon icon="solar:history-linear" /> Usage History
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Total ODO"
                        placeholder="e.g. 25000"
                        endContent={
                          <span className="text-default-400 text-sm">km</span>
                        }
                      />
                      <Input
                        label="Avg km/year"
                        placeholder="e.g. 12000"
                        endContent={
                          <span className="text-default-400 text-sm">
                            km/yr
                          </span>
                        }
                      />
                    </div>
                  </div>
                  <Divider />

                  <div>
                    <h4 className="flex items-center gap-2 text-base font-semibold mb-4 text-default-700">
                      <Icon icon="solar:ruler-linear" /> Dimensions & Condition
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Vehicle Weight"
                        placeholder="e.g. 2100"
                        endContent={
                          <span className="text-default-400 text-sm">kg</span>
                        }
                      />
                      <Input
                        label="Dimensions (LxWxH)"
                        placeholder="e.g. 4800x1900x1600"
                        endContent={
                          <span className="text-default-400 text-sm">mm</span>
                        }
                      />
                      <Select
                        label="Exterior Condition"
                        placeholder="Select condition"
                      >
                        <SelectItem key="new">New</SelectItem>
                        <SelectItem key="excellent">Excellent</SelectItem>
                        <SelectItem key="good">Good</SelectItem>
                        <SelectItem key="fair">Fair</SelectItem>
                      </Select>
                      <Select
                        label="Interior Condition"
                        placeholder="Select condition"
                      >
                        <SelectItem key="new">New</SelectItem>
                        <SelectItem key="excellent">Excellent</SelectItem>
                        <SelectItem key="good">Good</SelectItem>
                        <SelectItem key="fair">Fair</SelectItem>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 3: OWNER INFORMATION --- */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl text-primary-700">
                    <Icon icon="solar:user-id-bold" className="text-2xl" />
                    <p className="text-sm">
                      Please provide accurate owner details. This information
                      will be used for verification contracts.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="e.g. John Doe"
                      value={formData.ownerName}
                      onValueChange={(val) =>
                        setFormData({ ...formData, ownerName: val })
                      }
                    />
                    <Input
                      label="Address"
                      placeholder="House number, street, ward, district, city"
                      value={formData.address}
                      onValueChange={(val) =>
                        setFormData({ ...formData, address: val })
                      }
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        placeholder="e.g. 091xxxxxxx"
                        value={formData.phone}
                        onValueChange={(val) =>
                          setFormData({ ...formData, phone: val })
                        }
                      />
                      <Input
                        label="Email Address"
                        placeholder="e.g. example@email.com"
                        value={formData.email}
                        onValueChange={(val) =>
                          setFormData({ ...formData, email: val })
                        }
                      />
                    </div>
                    <Input
                      label="National ID / Passport"
                      placeholder="Enter ID number"
                      value={formData.idNumber}
                      onValueChange={(val) =>
                        setFormData({ ...formData, idNumber: val })
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-semibold">
                      Available Documents
                    </label>
                    <div className="flex flex-col gap-2">
                      <div className="p-4 border rounded-xl flex items-center justify-between cursor-pointer hover:border-primary transition-colors border-primary bg-primary-50/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-primary text-white">
                            <Icon icon="solar:check-circle-bold" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              Registration Certificate (Cavet)
                            </p>
                            <p className="text-xs text-default-500">
                              Required ownership proof
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                          Required
                        </span>
                      </div>

                      <div className="p-4 border rounded-xl flex items-center justify-between cursor-pointer hover:border-primary transition-colors hover:bg-default-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-default-100 text-default-500">
                            <Icon icon="solar:circle-linear" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              Inspection Certificate (Dang kiem)
                            </p>
                            <p className="text-xs text-default-500">
                              Valid vehicle inspection
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-xl flex items-center justify-between cursor-pointer hover:border-primary transition-colors hover:bg-default-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-default-100 text-default-500">
                            <Icon icon="solar:circle-linear" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              Insurance Policy
                            </p>
                            <p className="text-xs text-default-500">
                              Civil liability insurance
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 4: PHOTOS & DOCUMENTS --- */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Vehicle Info Summary Card */}
                    <div className="p-4 rounded-xl border border-default-200 bg-default-50">
                      <h4 className="font-bold mb-3">Vehicle Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-default-500">Model</span>
                          <span className="font-medium">VinFast VF8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">
                            License Plate
                          </span>
                          <span className="font-medium">30H-123.45</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">Color</span>
                          <span className="font-medium">White / Beige</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">Year</span>
                          <span className="font-medium">2023</span>
                        </div>
                      </div>
                    </div>

                    {/* Checklist Card */}
                    <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                      <h4 className="font-bold mb-3 text-blue-700">
                        Checklist
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-success-600">
                          <Icon icon="solar:check-circle-bold" />
                          <span>Basic Information</span>
                        </div>
                        <div className="flex items-center gap-2 text-success-600">
                          <Icon icon="solar:check-circle-bold" />
                          <span>Technical Specs</span>
                        </div>
                        <div className="flex items-center gap-2 text-success-600">
                          <Icon icon="solar:check-circle-bold" />
                          <span>Owner Details</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary-600 font-semibold">
                          <Icon icon="solar:clock-circle-bold" />
                          <span>Photos & Docs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex justify-between">
                      <span>Exterior Photos</span>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        Min 3 photos
                      </span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="aspect-[4/3] border-2 border-dashed border-default-300 rounded-xl flex flex-col items-center justify-center text-default-400 hover:bg-default-50 cursor-pointer transition-colors">
                        <Icon
                          icon="solar:camera-add-linear"
                          className="text-3xl mb-1"
                        />
                        <span className="text-xs">Front View</span>
                      </div>
                      <div className="aspect-[4/3] border-2 border-dashed border-default-300 rounded-xl flex flex-col items-center justify-center text-default-400 hover:bg-default-50 cursor-pointer transition-colors">
                        <Icon
                          icon="solar:camera-add-linear"
                          className="text-3xl mb-1"
                        />
                        <span className="text-xs">Side View</span>
                      </div>
                      <div className="aspect-[4/3] border-2 border-dashed border-default-300 rounded-xl flex flex-col items-center justify-center text-default-400 hover:bg-default-50 cursor-pointer transition-colors">
                        <Icon
                          icon="solar:add-circle-linear"
                          className="text-3xl mb-1"
                        />
                        <span className="text-xs">Add More</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex justify-between">
                      <span>Interior Photos</span>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        Min 2 photos
                      </span>
                    </h4>
                    <div className="h-32 border-2 border-dashed border-default-300 rounded-xl flex flex-col items-center justify-center text-default-400 hover:bg-default-50 cursor-pointer transition-colors">
                      <Icon
                        icon="solar:cloud-upload-linear"
                        className="text-4xl mb-2 text-primary"
                      />
                      <span className="font-medium text-default-600">
                        Drag & Drop Interior Photos Here
                      </span>
                      <span className="text-xs">
                        or click to browse from your computer
                      </span>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="font-semibold mb-3">Documents</h4>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-success-100 text-success-600 flex items-center justify-center">
                            <Icon icon="solar:file-check-bold" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              Registration (Cavet)
                            </span>
                            <span className="text-xs text-success">
                              Uploaded successfully
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          color="danger"
                        >
                          <Icon icon="solar:trash-bin-trash-linear" />
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg flex items-center justify-between border-dashed hover:border-primary cursor-pointer hover:bg-primary-50/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-default-100 text-default-500 flex items-center justify-center">
                            <Icon icon="solar:file-send-linear" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              Inspection Certificate
                            </span>
                            <span className="text-xs text-default-400">
                              Tap to upload
                            </span>
                          </div>
                        </div>
                        <Icon
                          icon="solar:upload-linear"
                          className="text-default-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter className="flex justify-between items-center">
              <Button
                variant="light"
                onPress={handleBack}
                isDisabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                color="secondary"
                onPress={
                  currentStep === steps.length - 1
                    ? () => handleSubmit(onClose)
                    : handleNext
                }
                endContent={
                  currentStep === steps.length - 1 ? undefined : (
                    <Icon icon="solar:arrow-right-linear" />
                  )
                }
              >
                {currentStep === steps.length - 1
                  ? "Submit Vehicle"
                  : "Next Step"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
