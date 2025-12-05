"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
  User,
  Image,
} from "@heroui/react";
import { Icon } from "@iconify/react";

// --- Types & Mock Data (Có thể tách ra file riêng) ---
interface Listing {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  vehicleName: string;
  sharePercentage: number;
  userPrice: number;
  aiPrice: number;
  image: string;
}

const listings: Listing[] = [
  {
    id: "1",
    userId: "12345",
    userName: "David Nguyen",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    vehicleName: "VinFast VF8 Plus",
    sharePercentage: 10,
    userPrice: 120,
    aiPrice: 118,
    image:
      "https://images.unsplash.com/photo-1669910547700-1c045b849319?q=80&w=800&auto=format&fit=crop", // VinFast VF8 style
  },
  {
    id: "2",
    userId: "67890",
    userName: "Sarah Jenkins",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    vehicleName: "Tesla Model Y Performance",
    sharePercentage: 5,
    userPrice: 210,
    aiPrice: 212,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop", // Red Tesla
  },
  {
    id: "3",
    userId: "11223",
    userName: "Michael Chen",
    userAvatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    vehicleName: "Hyundai Ioniq 5",
    sharePercentage: 15,
    userPrice: 180,
    aiPrice: 175,
    image:
      "https://images.unsplash.com/photo-1662124508216-17b545464455?q=80&w=800&auto=format&fit=crop", // Silver Ioniq 5
  },
  {
    id: "4",
    userId: "44556",
    userName: "Emily Davis",
    userAvatar: "https://i.pravatar.cc/150?u=a048581f4e29026024d",
    vehicleName: "Kia EV6 GT-Line",
    sharePercentage: 10,
    userPrice: 150,
    aiPrice: 152,
    image:
      "https://images.unsplash.com/photo-1678201256338-7f465d625573?q=80&w=800&auto=format&fit=crop", // Grey Kia EV6
  },
  {
    id: "5",
    userId: "77889",
    userName: "Robert Wilson",
    userAvatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    vehicleName: "Ford Mustang Mach-E",
    sharePercentage: 8,
    userPrice: 250,
    aiPrice: 245,
    image:
      "https://images.unsplash.com/photo-1620882006323-936630f9525c?q=80&w=800&auto=format&fit=crop", // Blue Mustang Mach-E
  },
  {
    id: "6",
    userId: "99001",
    userName: "Alex Johnson",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
    vehicleName: "Polestar 2",
    sharePercentage: 12,
    userPrice: 220,
    aiPrice: 220,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop", // Polestar
  },
  {
    id: "7",
    userId: "33445",
    userName: "Jessica Parker",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e290260242",
    vehicleName: "Porsche Taycan 4S",
    sharePercentage: 5,
    userPrice: 450,
    aiPrice: 440,
    image:
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81d?q=80&w=800&auto=format&fit=crop", // Porsche Taycan
  },
  {
    id: "8",
    userId: "55667",
    userName: "Tom Cruise",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e290260241",
    vehicleName: "Audi e-tron GT",
    sharePercentage: 20,
    userPrice: 380,
    aiPrice: 385,
    image:
      "https://images.unsplash.com/photo-1617704548623-340751e39a38?q=80&w=800&auto=format&fit=crop", // Audi e-tron
  },
];

const ListingCard = ({ listing }: { listing: Listing }) => {
  const isGoodDeal = listing.aiPrice >= listing.userPrice;
  const aiPriceColor = isGoodDeal ? "text-success-500" : "text-warning-400";

  return (
    <Card>
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-default-500">
        <Image
          removeWrapper
          alt={listing.vehicleName}
          className="z-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={listing.image}
        />
        <div className="absolute top-3 right-3 z-10">
          <Chip color="primary" variant="solid" size="sm" className="font-bold">
            {listing.sharePercentage}% Share
          </Chip>
        </div>
      </div>

      <CardBody className="px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <User
            name={listing.userName}
            description=""
            avatarProps={{
              src: listing.userAvatar,
              size: "sm",
              isBordered: true,
              color: "primary",
              classNames: { base: "w-6 h-6" },
            }}
            classNames={{
              name: "text-xs text-default-600 font-medium",
            }}
          />
        </div>

        <h3 className="font-bold text-default-900 text-lg leading-tight">
          {listing.vehicleName} - Selling {listing.sharePercentage}%
        </h3>

        <div className="flex flex-col gap-1 mt-1">
          <div className="flex justify-between text-sm">
            <span className="text-default-600">User Price:</span>
            <span className="text-default-900 font-bold">
              {listing.userPrice}M VND
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-default-600">AI Suggested:</span>
            <span className={`${aiPriceColor} font-bold`}>
              {listing.aiPrice}M VND
            </span>
          </div>
        </div>
      </CardBody>

      <CardFooter className="px-4 pb-4 pt-0 gap-3">
        <Button
          fullWidth
          variant="faded"
          className="font-medium"
          startContent={<Icon icon="lucide:x" />}
        >
          Reject
        </Button>
        <Button
          fullWidth
          color="primary"
          variant="shadow"
          className="font-bold"
          startContent={<Icon icon="lucide:check" />}
        >
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- Page Component ---
export default function PendingListingsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((item) => (
        <ListingCard key={item.id} listing={item} />
      ))}
    </div>
  );
}
