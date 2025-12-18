"use client";
import {
  myGarageVehicles,
  useCreateOffering,
} from "@/contexts/CreateOfferingContext";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Slider,
  Textarea,
} from "@heroui/react";

export const Create = () => {
  const {
    packageData,
    updatePackageData,
    nextStep,
    selectedVehicle,
    selectVehicle,
  } = useCreateOffering();

  const inputStyles = {
    label: "text-black font-medium mb-1",
    inputWrapper:
      "bg-default-100 hover:bg-default-200 data-[focus=true]:bg-default-100 border-none",
    input: "text-black",
  };

  return (
    <Card>
      <CardBody className="p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-bold">Define Share Offering</h2>
        <div className="space-y-2">
          <label className="font-medium text-sm">
            Select Vehicle from Garage
          </label>
          <Select
            items={myGarageVehicles}
            selectedKeys={[selectedVehicle.id]}
            onChange={(e) => selectVehicle(e.target.value)}
            classNames={inputStyles}
            aria-label="Select Vehicle"
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data?.name}
                    className="w-6 h-6"
                    src={item.data?.image}
                  />
                  <div className="flex flex-col">
                    <span>{item.data?.name}</span>
                  </div>
                </div>
              ));
            }}
          >
            {(vehicle) => (
              <SelectItem key={vehicle.id} textValue={vehicle.name}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={vehicle.name}
                    className="w-8 h-8 rounded-md"
                    src={vehicle.image}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{vehicle.name}</span>
                    <span className="text-tiny text-default-800">
                      {vehicle.detail}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-black">
              Total Ownership to Sell
            </span>
            <span className="text-lg font-bold text-success-500">
              {packageData.ownershipPercent}
            </span>
          </div>
          <Slider
            aria-label="Ownership"
            color="success"
            step={1}
            maxValue={100}
            minValue={1}
            value={packageData.ownershipPercent}
            onChange={(v) =>
              updatePackageData({ ownershipPercent: v as number })
            }
            classNames={{
              track: "bg-default-200 h-2",
              filler: "bg-emerald-400",
              thumb: "bg-white border-2 border-emerald-400 shadow-sm",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Price per Share"
            placeholder="0.00"
            labelPlacement="outside"
            startContent={<span>$</span>}
            type="number"
            classNames={inputStyles}
            value={packageData.pricePerPercent.toString()}
            onValueChange={(v) =>
              updatePackageData({ pricePerPercent: Number(v) })
            }
            isRequired
          />
          <Input
            label="Min Share to Purchase"
            placeholder="5"
            labelPlacement="outside"
            type="number"
            classNames={inputStyles}
            value={packageData.minPurchasePercent.toString()}
            onValueChange={(v) =>
              updatePackageData({ minPurchasePercent: Number(v) })
            }
            isRequired
          />
        </div>

        {/* Sales Period */}
        <div>
          <label className="text-sm font-medium text-black mb-2 block">
            Sales Period
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Start Date"
              placeholder="mm/dd/yyyy"
              labelPlacement="outside"
              type="date"
              classNames={inputStyles}
              value={packageData.startDate}
              onValueChange={(v) => updatePackageData({ startDate: v })}
            />
            <Input
              label="End Date"
              placeholder="mm/dd/yyyy"
              labelPlacement="outside"
              type="date"
              classNames={inputStyles}
              value={packageData.endDate}
              onValueChange={(v) => updatePackageData({ endDate: v })}
            />
          </div>
          <p className="text-tiny text-default-500 mt-2">
            This period applies to the offering availability, not the vehicle
            usage duration. Unsold shares will be automatically cancelled after
            the end date.
          </p>
        </div>

        {/* <Textarea
          label="Terms & Conditions"
          placeholder="Enter specific terms for this offering..."
          labelPlacement="outside"
          classNames={inputStyles}
          minRows={3}
        /> */}

        <div className="flex justify-end pt-4">
          <Button
            className="font-bold"
            color="success"
            variant="shadow"
            onPress={nextStep}
          >
            Continue to Preview
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
