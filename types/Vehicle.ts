type VehicleStatus = "listed" | "pending" | "available";

interface IVehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  image: string;
  status: VehicleStatus;
  sharesOffered?: string;
  sharesSold?: number;
  totalValue?: number;
  estMarketValue?: number;
  description?: string;
}

export { type IVehicle, type VehicleStatus };
