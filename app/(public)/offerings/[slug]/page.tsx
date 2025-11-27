"use client";

import AppBreadcrumb from "@/components/AppBreadcrumb";
import { formatCurrency } from "@/lib/utils/currency";
import {
  Button,
  Card,
  CardBody,
  Image,
  Slider,
  Tab,
  Tabs,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { useState } from "react";

const offeringData = {
  id: "1",
  name: "2023 Tesla Model Y Long Range",
  slug: "2023-tesla-model-y-long-range",
  location: "San Francisco, CA",
  pricePer1Percent: 620,
  maxShareAvailable: 25,
  aiSuggestedPrice: "$6,150 - $6,300",
  seller: {
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?u=alex",
    rating: 4.8,
    reviews: 22,
  },
  images: [
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=300&auto=format&fit=crop",
  ],
  specs: [
    {
      label: "Mileage",
      value: "15,300 miles",
      icon: "ic:baseline-speed",
    },
    {
      label: "Battery Health",
      value: "98%",
      icon: "solar:battery-full-linear",
    },
    {
      label: "Range (EPA est.)",
      value: "330 miles",
      icon: "solar:route-linear",
    },
    {
      label: "Exterior Color",
      value: "Deep Blue Metallic",
      icon: "solar:palette-linear",
    },
    { label: "Interior", value: "Black Premium", icon: "solar:sofa-linear" },
    { label: "Features", value: "Autopilot Enabled", icon: "solar:cpu-linear" },
  ],
};

function OfferingDetailsPage() {
  const params = useParams();

  const slug = params.slug as string;

  const [sharePercent, setSharePercent] = useState<number | number[]>(10);
  const [selectedImage, setSelectedImage] = useState(0);

  const currentPercent = Array.isArray(sharePercent)
    ? sharePercent[0]
    : sharePercent;
  const totalPrice = currentPercent * offeringData.pricePer1Percent;

  return (
    <>
      <AppBreadcrumb
        dynamicRoutes={{
          [slug]: offeringData.name,
        }}
      />
      <div className="space-y-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="relative w-full aspect-16/10 bg-black/20 rounded-2xl overflow-hidden border border-default-100/10">
                <Image
                  removeWrapper
                  alt="Main Vehicle"
                  className="w-full h-full object-cover"
                  src={offeringData.images[selectedImage]}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {offeringData.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === idx
                        ? "border-[#00E396]"
                        : "border-transparent hover:border-white/50"
                    }`}
                  >
                    <Image
                      removeWrapper
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                      src={img}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-1">
                {offeringData.name}
              </h1>
              <div className="flex items-center gap-1 text-default-600 text-small">
                <Icon icon="solar:map-point-linear" />
                <span>{offeringData.location}</span>
              </div>
            </div>

            <Card>
              <CardBody className="p-6 space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-small text-default-600">
                      Select Share Percentage (Up to{" "}
                      {offeringData.maxShareAvailable}% available)
                    </span>
                    <span className="text-xl font-bold text-success-500">
                      {currentPercent}%
                    </span>
                  </div>
                  <Slider
                    aria-label="Share Percentage"
                    size="sm"
                    color="success"
                    step={1}
                    maxValue={offeringData.maxShareAvailable}
                    minValue={1}
                    value={sharePercent}
                    onChange={setSharePercent}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 bg-default-300 p-4 rounded-xl border border-default-100/5">
                  <div>
                    <p className="text-tiny text-default-800 mb-1">
                      Price per 1% Share
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      ${offeringData.pricePer1Percent}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-tiny text-default-800 mb-1">
                      Total Investment
                    </p>
                    <p className="text-xl font-bold text-success-600">
                      {formatCurrency(totalPrice)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    fullWidth
                    variant="flat"
                    color="success"
                    size="lg"
                    className="font-bold"
                  >
                    Buy {currentPercent}% Share Now
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="bordered" color="primary">
                      Make an Offer
                    </Button>
                    <Button variant="bordered" color="warning">
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    icon="solar:stars-minimalistic-bold"
                    className="text-success-500 text-xl"
                  />
                  <h3 className="font-bold text-foreground">
                    AI Insights & Tools
                  </h3>
                </div>
                <p className="text-small text-default-600 leading-relaxed mb-3">
                  Our AI suggests a fair market price for a {currentPercent}%
                  share is{" "}
                  <span className="text-primary-500 font-semibold">
                    {offeringData.aiSuggestedPrice}
                  </span>
                  .
                </p>
                <div className="flex items-center gap-1 text-success-500 text-small font-medium cursor-pointer hover:underline">
                  <span>Explore Financing Options</span>
                  <Icon icon="solar:arrow-right-linear" />
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-5 flex flex-row items-center justify-between">
                <div className="flex gap-3 items-center">
                  <User
                    name={offeringData.seller.name}
                    description={
                      <div className="flex items-center gap-1 text-warning text-tiny">
                        <Icon icon="solar:star-bold" />
                        <span>
                          {offeringData.seller.rating} (
                          {offeringData.seller.reviews} Reviews)
                        </span>
                      </div>
                    }
                    avatarProps={{
                      src: offeringData.seller.avatar,
                      size: "md",
                    }}
                    classNames={{ name: "font-bold" }}
                  />
                </div>
                <Button
                  size="sm"
                  variant="shadow"
                  color="success"
                  className="font-medium"
                >
                  View Profile
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>

        <Tabs
          variant="underlined"
          color="success"
          classNames={{
            tabList: "gap-6 p-0 border-b border-default-100/10 w-full",
            cursor: "w-full",
            tab: "max-w-fit px-0 h-10",
            tabContent:
              "group-data-[selected=true]:text-success-500 text-default-600 font-medium",
          }}
        >
          <Tab key="details" title="Vehicle Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
              {offeringData.specs.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Icon
                    icon={spec.icon}
                    className="text-success-500 text-2xl shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-small font-bold text-default-600">
                      {spec.label}:
                    </p>
                    <p className="text-small text-default-500">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Tab>
          <Tab key="cost" title="Ownership & Costs" />
          <Tab key="terms" title="Terms & Conditions" />
        </Tabs>
      </div>
    </>
  );
}

export default OfferingDetailsPage;
