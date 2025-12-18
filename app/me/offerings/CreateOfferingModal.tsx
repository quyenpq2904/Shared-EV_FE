"use client";

import {
  Image,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import {
  CreateOfferingProvider,
  useCreateOffering,
} from "@/contexts/CreateOfferingContext";
import RowSteps from "@/components/RowSteps";
import { Create } from "./create-offering/Create";
import { Preview } from "./create-offering/Preview";
import { Result } from "./create-offering/Result";

const RightSummary = () => {
  const { selectedVehicle, totalValue, currentStep, packageData } =
    useCreateOffering();

  if (currentStep === 2) return null;

  return (
    <Card className="">
      <CardBody className="p-6 space-y-6">
        <h2 className="text-xl font-bold">Offering Summary</h2>
        <div className="flex gap-4">
          <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              alt={selectedVehicle.name}
              className="w-full h-full object-cover"
              src={selectedVehicle.image}
              removeWrapper
            />
          </div>
          <div>
            <p className="font-bold text-sm">Share of {selectedVehicle.name}</p>
            <p className="text-xs text-default-600 mt-1">
              {selectedVehicle.detail}
            </p>
          </div>
        </div>

        <Divider className="bg-default-100" />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-default-600">Shares Available</span>
            <span className="font-medium text-black">
              {packageData.ownershipPercent}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-default-600">Min Purchase</span>
            <span className="font-medium text-black">
              {packageData.minPurchasePercent}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-default-600">Platform Fee</span>
            <span className="font-medium text-black">$150.00</span>
          </div>
        </div>

        <Divider className="bg-default-100" />

        <div className="flex justify-between items-center">
          <span className="font-bold text-black">Total Value</span>
          <span className="font-bold text-2xl text-success-500">
            ${totalValue.toLocaleString()}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

const CreateOfferingFlow = ({ onClose }: { onClose: () => void }) => {
  const { currentStep, setStep } = useCreateOffering();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Create />;
      case 1:
        return <Preview />;
      case 2:
        return <Result />;
      default:
        return <Create />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 w-full">
      <div className="flex justify-center">
        <RowSteps
          currentStep={currentStep}
          onStepChange={currentStep < 2 ? setStep : undefined}
          color="success"
          steps={[
            { title: "Create Offering" },
            { title: "Preview" },
            { title: "Under Review" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={currentStep === 2 ? "lg:col-span-12" : "lg:col-span-8"}>
          {renderStepContent()}
        </div>
        <div className="lg:col-span-4">
          <RightSummary />
        </div>
      </div>
    </div>
  );
};

interface CreateOfferingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateOfferingModal({
  isOpen,
  onOpenChange,
}: CreateOfferingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create New Offering
            </ModalHeader>
            <ModalBody className="pb-8">
              <CreateOfferingProvider>
                <CreateOfferingFlow onClose={onClose} />
              </CreateOfferingProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
