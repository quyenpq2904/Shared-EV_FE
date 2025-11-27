type OfferingStatus = "active" | "pending" | "sold" | "draft";

interface IOffering {
  id: string;
  year: number;
  make: string;
  model: string;
  description?: string;
  image: string;
  location: string;
  range: number;
  seats: number;
  color: string;
  sharePercentage: number;
  pricePerShare: number;
  sharesSold: number;
  totalShares: number;
  totalValue: number;
  status: OfferingStatus;
  isLiked?: boolean;
}

export type { IOffering, OfferingStatus };
