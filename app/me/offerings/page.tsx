"use client";

import AppBreadcrumb from "@/components/AppBreadcrumb";
import { IOffering } from "@/types/Offering";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Pagination,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import CreateOfferingModal from "./CreateOfferingModal";

interface IRequestOffering extends Omit<IOffering, "status"> {
  dateSubmitted: string;
  requestId: string;
  licensePlate: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  category: string;
}

const mockOfferings: IRequestOffering[] = Array.from({ length: 6 }).map(
  (_, index) => {
    const brands = [
      "Mercedes-Benz",
      "BMW",
      "Mazda",
      "Tesla",
      "Porsche",
      "Ford",
    ];
    const models = [
      "C300 AMG 2023",
      "320i Sport Line 2022",
      "CX-5 Premium 2023",
      "Model Y Long Range",
      "Taycan 4S",
      "Mustang Mach-E",
    ];
    const categories = ["SEDAN", "SEDAN", "SUV", "SUV", "SEDAN", "SUV"];
    const images = [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ebcc5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614207212035-c5432d677688?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1696599622732-d304443939d2?q=80&w=1000&auto=format&fit=crop",
    ];
    const statuses: ("pending" | "approved" | "rejected")[] = [
      "pending",
      "approved",
      "rejected",
      "pending",
      "approved",
      "rejected",
    ];

    const i = index % 6;

    return {
      id: `${index}`,
      year: 2023,
      make: brands[i].split(" ")[0],
      model: models[i],
      location: "San Francisco, CA",
      image: images[i],
      range: 300,
      seats: 5,
      color: "White",
      sharePercentage: 10,
      pricePerShare: 25000,
      sharesSold: 5,
      totalShares: 10,
      totalValue: 250000,
      status: statuses[i],
      isLiked: false,
      dateSubmitted: "24/05/2024",
      requestId: `REQ-2023-00${index + 1}`,
      licensePlate: `30K-123.4${index}`,
      category: categories[i],
      rejectionReason:
        statuses[i] === "rejected"
          ? "Financial profile does not meet requirements"
          : undefined,
    };
  }
);

const OfferingCard = ({ item }: { item: IRequestOffering }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "PENDING APPROVAL";
      case "approved":
        return "APPROVED";
      case "rejected":
        return "REJECTED";
      default:
        return status.toUpperCase();
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-all border border-default-100">
      <CardBody className="p-0">
        <div className="flex flex-col md:flex-row gap-4 p-3">
          {/* Image Section */}
          <div className="relative w-full md:w-[240px] aspect-video rounded-lg overflow-hidden shrink-0 bg-default-100">
            <div className="absolute top-2 left-2 z-10">
              <Chip
                radius="sm"
                size="sm"
                classNames={{
                  base: "bg-[#454555] text-white font-medium px-1 h-5 min-h-0",
                  content: "font-semibold text-[10px] px-1",
                }}
              >
                {item.category}
              </Chip>
            </div>
            <Image
              removeWrapper
              alt={item.model}
              className="w-full h-full object-cover"
              src={item.image}
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Chip
                  color={getStatusColor(item.status)}
                  variant="flat"
                  size="sm"
                  startContent={
                    <div
                      className={`w-1.5 h-1.5 rounded-full ml-1 ${
                        item.status === "pending"
                          ? "bg-warning-500"
                          : item.status === "approved"
                          ? "bg-success-500"
                          : "bg-danger-500"
                      }`}
                    />
                  }
                  classNames={{
                    content:
                      "font-bold pl-1 text-[10px] uppercase tracking-wide",
                    base: "border-small border-opacity-20 h-6 min-h-0",
                  }}
                >
                  {getStatusLabel(item.status)}
                </Chip>
                <div className="w-1 h-1 rounded-full bg-default-300" />
                <span className="text-tiny text-default-500 font-medium">
                  Purchase Request
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground line-clamp-1">
                  {item.make} {item.model}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-tiny text-default-500">
                <div className="flex items-center gap-1.5">
                  <Icon icon="solar:calendar-linear" className="text-base" />
                  <span>Submitted: {item.dateSubmitted}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon
                    icon="solar:document-text-linear"
                    className="text-base"
                  />
                  <span className="font-mono bg-default-100 px-1.5 py-0.5 rounded text-[10px]">
                    #{item.requestId}
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-tiny text-default-500 font-medium">
                  License Plate:{" "}
                  <span className="text-foreground font-semibold">
                    {item.licensePlate}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center md:items-center justify-start md:justify-end">
            <Button
              as={Link}
              href={`/offerings/${item.id}`}
              color={item.status === "rejected" ? "default" : "primary"}
              variant={"solid"}
              className={`font-semibold min-w-[140px] shadow-sm ${
                item.status === "rejected" ? "" : "bg-[#6C5DD3]"
              }`}
            >
              {item.status === "rejected" ? "View Details" : "View Details"}
              {item.status !== "rejected" && (
                <Icon icon="solar:arrow-right-linear" className="text-xl" />
              )}
            </Button>
          </div>
        </div>

        {/* Footer for Rejected Status */}
        {item.status === "rejected" && (
          <div className="border-t border-dashed border-default-200 px-5 py-3 bg-danger-50 flex items-start gap-2">
            <Icon
              icon="solar:info-circle-bold"
              className="text-danger text-lg mt-0.5 shrink-0"
            />
            <p className="text-small text-danger font-medium">
              Reason: {item.rejectionReason}
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

function OfferingsPage() {
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const rowsPerPage = 5;
  const pages = Math.ceil(mockOfferings.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return mockOfferings.slice(start, end);
  }, [page]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-default-900">
            My EV Share Offerings
          </h1>
          <p className="text-default-600">
            Track the status of your purchase requests and vehicle shares.
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Icon icon="solar:add-circle-bold" />}
          onPress={onOpen}
        >
          Create Offering
        </Button>
      </div>

      <div className="space-y-6 mt-8">
        {items.map((item) => (
          <OfferingCard key={item.id} item={item} />
        ))}

        {pages > 1 && (
          <div className="flex justify-center mt-8 pb-10">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        )}
      </div>

      <CreateOfferingModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
export default OfferingsPage;
