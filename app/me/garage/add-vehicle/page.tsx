"use client";

import React from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Textarea,
  Image,
} from "@heroui/react";
import { Icon } from "@iconify/react";

function AddVehiclePage() {
  return (
    <div className="flex justify-center">
      <div className="w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Add Your Vehicle to the Platform
          </h1>
          <p className="text-default-600">
            Start by entering the essential details of your electric vehicle.
          </p>
        </div>
        <div className="border border-default-400 rounded-2xl p-6 md:p-10 space-y-8">
          <section className="flex flex-col space-y-6">
            <h2 className="text-xl font-bold">Vehicle Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Make"
                placeholder="Select Make"
                labelPlacement="outside"
              >
                <SelectItem key="tesla">Tesla</SelectItem>
                <SelectItem key="rivian">Rivian</SelectItem>
                <SelectItem key="ford">Ford</SelectItem>
              </Select>

              <Select
                label="Model"
                placeholder="Select Model"
                labelPlacement="outside"
              >
                <SelectItem key="modely">Model Y</SelectItem>
                <SelectItem key="r1t">R1T</SelectItem>
                <SelectItem key="mach-e">Mustang Mach-E</SelectItem>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Year"
                placeholder="Select Year"
                labelPlacement="outside"
              >
                <SelectItem key="2024">2024</SelectItem>
                <SelectItem key="2023">2023</SelectItem>
                <SelectItem key="2022">2022</SelectItem>
              </Select>

              <Input
                label="Trim / Variant"
                placeholder="e.g., Long Range"
                labelPlacement="outside"
              />
            </div>

            <div>
              <Input
                label="VIN (Vehicle Identification Number)"
                placeholder="Enter 17-digit VIN"
                labelPlacement="outside"
                endContent={
                  <Icon
                    icon="solar:info-circle-linear"
                    className="text-default-500 cursor-help"
                  />
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Body Type"
                placeholder="Select Body Type"
                labelPlacement="outside"
              >
                <SelectItem key="suv">SUV</SelectItem>
                <SelectItem key="sedan">Sedan</SelectItem>
                <SelectItem key="truck">Truck</SelectItem>
              </Select>

              <Input
                label="Current Mileage"
                placeholder="e.g., 15000"
                labelPlacement="outside"
                type="number"
              />
            </div>
            <div>
              <label className="text-sm mb-3 block">Condition</label>
              <RadioGroup
                orientation="horizontal"
                defaultValue="new"
                classNames={{ wrapper: "gap-6" }}
              >
                <Radio value="new" color="success">
                  New
                </Radio>
                <Radio value="like-new" color="success">
                  Like New
                </Radio>
                <Radio value="excellent" color="success">
                  Excellent
                </Radio>
              </RadioGroup>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">Photos & Media</h2>

            <div className="border-2 border-dashed border-default-500 rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer">
              <div className="w-12 h-12 bg-default-300 rounded-lg flex items-center justify-center">
                <Icon
                  icon="solar:upload-linear"
                  className="text-2xl text-default-700"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-default-600">
                  <span className="text-[#00E396] font-bold hover:underline">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-default-500 mt-1">
                  Add at least 5 photos. PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-default-100/10">
                <Image
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=300&auto=format&fit=crop"
                  alt="Car Front"
                  className="w-full h-full object-cover"
                  removeWrapper
                />
              </div>
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-default-100/10">
                <Image
                  src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=300&auto=format&fit=crop"
                  alt="Car Side"
                  className="w-full h-full object-cover"
                  removeWrapper
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">Description</h2>
            <Textarea
              placeholder="Add any personal comments or extra details about the vehicle's history and features."
              minRows={4}
              variant="bordered"
            />
          </section>

          <div className="flex justify-end items-center gap-4 pt-4">
            <Button variant="light" className="font-medium">
              Save as Draft
            </Button>
            <Button className="font-bold" color="success" variant="shadow">
              Save and Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVehiclePage;
