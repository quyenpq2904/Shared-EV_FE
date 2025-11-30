"use client";

import { useCreateOffering } from "@/contexts/CreateOfferingContext";
import { Button, Card, CardBody, Checkbox, Divider } from "@heroui/react";

export const Preview = () => {
  const { packageData, totalValue, nextStep, prevStep } = useCreateOffering();

  return (
    <Card>
      <CardBody className="p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-bold">Preview Your Offering</h2>

        <div className="space-y-4 p-4 bg-default-50 rounded-xl">
          <div className="flex justify-between">
            <span className="text-default-600">Total Ownership</span>
            <span className="font-bold ">{packageData.ownershipPercent}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-default-600">Price / 1%</span>
            <span className="font-bold ">${packageData.pricePerPercent}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-default-600">Minimum Purchase</span>
            <span className="font-bold ">
              {packageData.minPurchasePercent}%
            </span>
          </div>
          <Divider />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold ">Total Offering Value</span>
            <span className="text-2xl font-bold text-success-500">
              ${totalValue.toLocaleString()}
            </span>
          </div>
        </div>

        <Checkbox
          defaultSelected
          color="success"
          classNames={{ label: "text-small text-default-600" }}
        >
          I confirm that all the information provided is accurate and complies
          with the platform policies.
        </Checkbox>

        <div className="flex justify-between pt-2">
          <Button variant="light" onPress={prevStep}>
            Back
          </Button>
          <Button
            className="font-bold"
            color="success"
            variant="shadow"
            onPress={nextStep}
          >
            Submit Offering
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
