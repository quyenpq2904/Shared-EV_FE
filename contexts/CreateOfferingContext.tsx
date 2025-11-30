"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

// --- 1. Định nghĩa kiểu dữ liệu xe ---
export interface Vehicle {
  id: string;
  name: string;
  detail: string;
  image: string;
}

// --- 2. Mock Data ---
export const myGarageVehicles: Vehicle[] = [
  {
    id: "1",
    name: "2023 Tesla Model Y",
    detail: "Long Range | Deep Blue Metallic",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "2022 Rivian R1T",
    detail: "Adventure Package | Forest Green",
    image:
      "https://images.unsplash.com/photo-1669649514436-09259795cf58?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "2023 Ford Mustang Mach-E",
    detail: "Premium AWD | Space White",
    image:
      "https://images.unsplash.com/photo-1696599622732-d304443939d2?q=80&w=1000&auto=format&fit=crop",
  },
];

export interface SharePackageData {
  ownershipPercent: number;
  pricePerPercent: number;
  minPurchasePercent: number;
  terms: string;
}

interface CreateOfferingContextType {
  selectedVehicle: Vehicle;
  selectVehicle: (id: string) => void;
  packageData: SharePackageData;
  totalValue: number;
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updatePackageData: (data: Partial<SharePackageData>) => void;
}

const CreateOfferingContext = createContext<
  CreateOfferingContextType | undefined
>(undefined);

export function CreateOfferingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    myGarageVehicles[0].id
  );

  const selectedVehicle = useMemo(
    () =>
      myGarageVehicles.find((v) => v.id === selectedVehicleId) ||
      myGarageVehicles[0],
    [selectedVehicleId]
  );

  const [packageData, setPackageData] = useState<SharePackageData>({
    ownershipPercent: 40,
    pricePerPercent: 1200,
    minPurchasePercent: 5,
    terms: "",
  });

  const totalValue = packageData.ownershipPercent * packageData.pricePerPercent;

  const updatePackageData = (data: Partial<SharePackageData>) => {
    setPackageData((prev) => ({ ...prev, ...data }));
  };

  // ✅ FIX LỖI Ở ĐÂY: Khai báo hàm setStep
  const setStep = (step: number) => setCurrentStep(step);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const selectVehicle = (id: string) => setSelectedVehicleId(id);

  return (
    <CreateOfferingContext.Provider
      value={{
        selectedVehicle,
        selectVehicle,
        packageData,
        totalValue,
        currentStep,
        setStep, // ✅ Bây giờ biến này đã tồn tại
        nextStep,
        prevStep,
        updatePackageData,
      }}
    >
      {children}
    </CreateOfferingContext.Provider>
  );
}

export function useCreateOffering() {
  const context = useContext(CreateOfferingContext);
  if (!context)
    throw new Error("useCreateOffering must be used within Provider");
  return context;
}
