type OfferingStatus = "active" | "pending" | "sold" | "draft";

interface IOffering {
  id: string;
  model: string;
  description: string;
  image: string;
  sharesSold: number;
  totalShares: number;
  pricePerShare: number;
  totalValue: number;
  status: OfferingStatus;
}

export type { IOffering, OfferingStatus };
