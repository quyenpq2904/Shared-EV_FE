"use client";

import AppBreadcrumb from "@/components/AppBreadcrumb";
import { formatCurrency } from "@/lib/utils/currency";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Input,
  Progress,
  Tab,
  Tabs,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
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
  specs: {
    basic: [
      { label: "Year", value: "2023", icon: "solar:calendar-linear" },
      { label: "ODO", value: "15,300 miles", icon: "ep:odometer" },
      {
        label: "Transmission",
        value: "Automatic",
        icon: "solar:transmission-circle-linear",
      },
      { label: "Engine", value: "Electric (EV)", icon: "solar:bolt-linear" },
      {
        label: "Exterior Color",
        value: "Deep Blue Metallic",
        icon: "solar:palette-linear",
      },
      { label: "Seats", value: "5 Seats", icon: "solar:sofa-linear" },
      { label: "Origin", value: "United States", icon: "solar:flag-linear" },
      { label: "Drivetrain", value: "AWD", icon: "solar:wheel-angle-linear" },
    ],
    condition: [
      {
        category: "Exterior",
        status: "Good",
        details: [
          "Original paint 98%, minor scratches on rear left bumper.",
          "Windshield and window glass intact, no cracks.",
          "Headlights and taillights clear, no condensation.",
        ],
      },
      {
        category: "Interior",
        status: "Excellent",
        details: [
          "Seats and upholstery in excellent condition.",
          "Dashboard and controls fully functional.",
          "No odors or stains.",
        ],
      },
      {
        category: "Engine & Mechanical",
        status: "Good",
        details: [
          "Battery health check passed (98%).",
          "No fluid leaks or mechanical noises.",
          "Tires have 80% tread remaining.",
        ],
      },
    ],
  },
  ownership: {
    benefits: {
      shareCount: 1,
      daysPerYear: 30,
      milesPerYear: 3000,
    },
    rules: [
      {
        title: "No Rollover",
        description:
          "Unused days and mileage will not be carried over to the next year.",
        icon: "solar:forbidden-circle-bold",
        color: "danger",
      },
      {
        title: "Advance Booking",
        description: "Vehicle must be booked via app at least 24h in advance.",
        icon: "solar:calendar-add-bold",
        color: "primary",
      },
      {
        title: "Compliance",
        description:
          "Driver must possess a valid license and follow traffic laws.",
        icon: "ic:baseline-gavel",
      },
    ],
  },
  locationAndDocs: {
    location: {
      name: "Garage Co-Own Central",
      address: "123 Innovation Drive, Tech Park, CA 94043",
      mapImage:
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop",
    },
    documents: [
      {
        name: "Vehicle Registration",
        status: "Verified • PDF",
        icon: "solar:file-text-bold",
        color: "danger",
      },
      {
        name: "Hull Insurance",
        status: "Valid for 11 months • PDF",
        icon: "solar:file-check-bold",
        color: "primary",
      },
      {
        name: "Maintenance History",
        status: "Updated 2 weeks ago • PDF",
        icon: "solar:history-bold",
        color: "success",
      },
    ],
  },
  terms: [
    {
      title: "Usage Rights & Scheduling",
      content:
        "Each share entitles the owner to 30 days of usage per year. Booking is managed through the mobile app with a minimum 24-hour notice. Priority booking is available for holidays on a rotating basis.",
    },
    {
      title: "Maintenance & Repairs",
      content:
        "All routine maintenance, insurance, and repairs are covered by the annual operation fee. Owners are not responsible for unexpected repair costs unless due to negligence or violation of terms.",
    },
    {
      title: "Resale & Liquidity",
      content:
        "Owners can list their shares for sale on the marketplace at any time. The platform facilitates the transfer of ownership and handling of funds. A standard transaction fee applies.",
    },
    {
      title: "Insurance Coverage",
      content:
        "Comprehensive insurance coverage is included for all drivers approved by the platform. Deductibles apply in case of at-fault accidents.",
    },
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
    <div className="max-w-7xl mx-auto mt-5 mb-10 px-6">
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
            <Card className="h-full p-2">
              <CardBody className="p-4 flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-foreground leading-tight">
                    {offeringData.name}
                  </h1>
                  <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    className="text-default-400 data-[hover=true]:text-danger shrink-0"
                  >
                    <Icon icon="solar:heart-bold" className="text-2xl" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-small text-default-700 mb-1">
                      Share Price
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-4xl font-black text-foreground">
                        $2,500
                      </h2>
                      <span className="text-default-600">/ share</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-small mb-2">
                      <span className="text-success font-semibold">
                        5 Shares sold
                      </span>
                      <span className="text-default-600">5 left</span>
                    </div>
                    <Progress
                      aria-label="Shares sold"
                      value={5}
                      maxValue={10}
                      size="md"
                      color="success"
                      radius="full"
                    />
                    <p className="text-center text-tiny text-default-600 mt-1">
                      Funded in 12 days
                    </p>
                  </div>

                  <div>
                    <p className="text-small font-semibold mb-2">
                      How many shares?
                    </p>
                    <div className="flex items-center gap-3">
                      <Button
                        isIconOnly
                        variant="flat"
                        radius="full"
                        size="sm"
                        onPress={() =>
                          setSharePercent((prev) =>
                            Math.max(1, (prev as number) - 1)
                          )
                        }
                      >
                        <Icon icon="ic:round-minus" className="text-xl" />
                      </Button>
                      <div className="flex-1">
                        <Input
                          type="number"
                          value={sharePercent.toString()}
                          onValueChange={(v) => setSharePercent(Number(v))}
                          classNames={{
                            input: "text-center font-bold text-lg",
                            inputWrapper:
                              "bg-default-50 shadow-none h-10 min-h-10",
                          }}
                        />
                      </div>
                      <Button
                        isIconOnly
                        variant="flat"
                        radius="full"
                        size="sm"
                        onPress={() =>
                          setSharePercent((prev) =>
                            Math.min(
                              offeringData.maxShareAvailable,
                              (prev as number) + 1
                            )
                          )
                        }
                      >
                        <Icon icon="ic:round-plus" className="text-xl" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-default-600">Total Investment:</span>
                    <span className="text-xl font-bold text-foreground">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      fullWidth
                      color="success"
                      size="lg"
                      className="font-bold text-lg shadow-lg shadow-success/20"
                      endContent={<Icon icon="solar:arrow-right-linear" />}
                    >
                      Buy Shares
                    </Button>

                    {/* <Button
                      fullWidth
                      variant="bordered"
                      className="font-semibold border-default-200"
                    >
                      View Sample Contract
                    </Button> */}
                  </div>
                </div>

                <div className="pt-4 border-t border-default-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tiny font-bold text-default-500 uppercase">
                        OFFERED BY
                      </p>
                      <h4 className="font-bold text-foreground">
                        {offeringData.seller.name}
                      </h4>
                    </div>
                    <User
                      name=""
                      description={null}
                      avatarProps={{
                        src: offeringData.seller.avatar,
                        size: "sm",
                        isBordered: true,
                        color: "warning",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-tiny">
                    <div className="flex items-center gap-1 text-warning">
                      <Icon icon="solar:star-bold" />
                      <span className="text-default-600 font-medium">
                        4.8 (42 Deals)
                      </span>
                    </div>
                    <Link
                      href="#"
                      className="text-success font-bold hover:underline"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2 pt-2">
                  <Icon
                    icon="solar:verified-check-bold"
                    className="text-success"
                  />
                  <span className="text-tiny text-default-500">
                    SEC Regulated • Secure Payment
                  </span>
                </div>
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
            <div className="space-y-8">
              {/* Basic Information */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Icon
                    icon="solar:info-circle-bold"
                    className="text-primary text-xl"
                  />
                  <h3 className="text-xl font-bold text-foreground">
                    Basic Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                  {offeringData.specs.basic.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon
                        icon={spec.icon}
                        className="text-success-500 text-2xl shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-small font-bold text-default-600">
                          {spec.label}:
                        </p>
                        <p className="text-small text-default-500">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Vehicle Condition */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:shield-check-bold"
                      className="text-primary text-xl"
                    />
                    <h3 className="text-xl font-bold text-foreground">
                      Vehicle Condition
                    </h3>
                  </div>
                  <Chip
                    color="success"
                    variant="flat"
                    startContent={
                      <Icon
                        icon="solar:verified-check-bold"
                        className="text-lg"
                      />
                    }
                    classNames={{
                      base: "bg-success-50 border-success-200 border",
                      content: "font-bold text-success-700",
                    }}
                  >
                    Co-Own Certified
                  </Chip>
                </div>

                <div className="border border-default-100 rounded-2xl overflow-hidden">
                  <Accordion
                    defaultExpandedKeys={["0"]}
                    itemClasses={{
                      base: "px-2",
                      title: "font-semibold text-foreground",
                      trigger: "py-4",
                      content: "pb-4 text-small text-default-600",
                    }}
                    selectionMode="multiple"
                  >
                    {offeringData.specs.condition.map((item, idx) => (
                      <AccordionItem
                        key={idx.toString()}
                        aria-label={item.category}
                        startContent={
                          item.category === "Exterior" ? (
                            <Icon
                              icon="solar:car-bold"
                              className="text-default-400 text-xl"
                            />
                          ) : item.category === "Interior" ? (
                            <Icon
                              icon="solar:armchair-bold"
                              className="text-default-400 text-xl"
                            />
                          ) : (
                            <Icon
                              icon="solar:settings-bold"
                              className="text-default-400 text-xl"
                            />
                          )
                        }
                        title={
                          <div className="flex items-center justify-between w-full pr-4">
                            <span>{item.category}</span>
                            <span
                              className={`text-small font-bold ${
                                item.status === "Excellent"
                                  ? "text-success"
                                  : "text-success-600"
                              }`}
                            >
                              ✓ {item.status}
                            </span>
                          </div>
                        }
                      >
                        <ul className="space-y-2 pl-9">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <Icon
                                icon="solar:check-circle-bold"
                                className="text-success mt-0.5 shrink-0"
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>
            </div>
          </Tab>
          <Tab key="cost" title="Ownership & Costs">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    icon="solar:wallet-money-bold"
                    className="text-success text-2xl"
                  />
                  <h3 className="text-xl font-bold text-foreground">
                    Ownership Package Benefits
                  </h3>
                </div>
                <p className="text-default-500">
                  Smart co-ownership model helps you optimize costs while
                  enjoying premium experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-success-100">
                  <CardBody className="p-8 flex flex-col items-center justify-center text-center gap-6">
                    <p className="text-small font-bold text-default-400 uppercase tracking-wider">
                      Basic Benefits
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-6xl font-black text-success-600">
                        {offeringData.ownership.benefits.shareCount
                          .toString()
                          .padStart(2, "0")}
                      </span>
                      <div className="text-left">
                        <p className="font-bold text-xl text-foreground">
                          Share
                        </p>
                        <p className="text-small text-default-500">Ownership</p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-default-100" />

                    <div className="grid grid-cols-2 w-full gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-success-50 text-success rounded-full">
                          <Icon
                            icon="solar:calendar-bold"
                            className="text-2xl"
                          />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {offeringData.ownership.benefits.daysPerYear}
                          </p>
                          <p className="text-tiny text-default-500">
                            Days usage/year
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-success-50 text-success rounded-full">
                          <Icon icon="ph:speedometer" className="text-2xl" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {offeringData.ownership.benefits.milesPerYear.toLocaleString()}
                          </p>
                          <p className="text-tiny text-default-500">
                            Miles usage/year
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="">
                  <CardBody className="p-8">
                    <p className="text-small font-bold text-default-600 uppercase tracking-wider mb-6">
                      Mandatory Rules
                    </p>

                    <div className="space-y-6">
                      {offeringData.ownership.rules.map((rule, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div
                            className={`p-2 rounded-lg h-fit shrink-0 ${
                              rule.color === "danger"
                                ? "bg-danger-50 text-danger"
                                : rule.color === "primary"
                                ? "bg-primary-50 text-primary"
                                : "bg-secondary-50 text-secondary"
                            }`}
                          >
                            <Icon icon={rule.icon} className="text-xl" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">
                              {rule.title}
                            </p>
                            <p className="text-small text-default-500 leading-normal">
                              {rule.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Tab>
          <Tab key="location" title="Location & Documents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Storage Location */}
              <Card className="border border-default-100 shadow-sm">
                <CardBody className="p-0">
                  <div className="p-4 flex items-center gap-2 border-b border-default-100">
                    <Icon
                      icon="solar:map-point-bold"
                      className="text-primary text-xl"
                    />
                    <h3 className="text-lg font-bold text-foreground">
                      Storage Location
                    </h3>
                  </div>
                  <div className="relative aspect-video w-full group cursor-pointer">
                    <Image
                      removeWrapper
                      alt="Map Location"
                      className="w-full h-full object-cover"
                      src={offeringData.locationAndDocs.location.mapImage}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Button
                        color="primary"
                        startContent={<Icon icon="solar:map-bold" />}
                        className="font-bold shadow-lg"
                      >
                        View Map
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-foreground text-large">
                      {offeringData.locationAndDocs.location.name}
                    </h4>
                    <p className="text-default-500 text-small mt-1">
                      {offeringData.locationAndDocs.location.address}
                    </p>
                  </div>
                </CardBody>
              </Card>

              {/* Vehicle Documents */}
              <Card className="border border-default-100 shadow-sm">
                <CardBody className="p-0">
                  <div className="p-4 flex items-center gap-2 border-b border-default-100">
                    <Icon
                      icon="solar:folder-with-files-bold"
                      className="text-primary text-xl"
                    />
                    <h3 className="text-lg font-bold text-foreground">
                      Vehicle Documents
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {offeringData.locationAndDocs.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-default-50 hover:bg-default-100 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              doc.color === "danger"
                                ? "bg-danger-50 text-danger"
                                : doc.color === "primary"
                                ? "bg-primary-50 text-primary"
                                : "bg-success-50 text-success"
                            }`}
                          >
                            <Icon icon={doc.icon} className="text-2xl" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-small">
                              {doc.name}
                            </p>
                            <p className="text-tiny text-default-500">
                              {doc.status}
                            </p>
                          </div>
                        </div>
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          className="text-default-400 group-hover:text-primary"
                        >
                          <Icon icon="solar:eye-bold" className="text-xl" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tab>
          <Tab key="terms" title="Terms & Conditions">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    icon="solar:document-text-bold"
                    className="text-success text-2xl"
                  />
                  <h3 className="text-xl font-bold text-foreground">
                    Terms & Conditions
                  </h3>
                </div>
                <p className="text-default-500">
                  Transparency is key. Please review the essential terms of
                  co-ownership below.
                </p>
              </div>

              <Card className="shadow-none border border-default-100">
                <CardBody className="p-0">
                  <Accordion
                    selectionMode="multiple"
                    defaultExpandedKeys={["0"]}
                    itemClasses={{
                      base: "px-6 border-b border-default-100 last:border-b-0",
                      title: "font-bold text-foreground",
                      trigger: "py-6",
                      content: "pb-6 text-default-600 leading-relaxed",
                      indicator: "text-success",
                    }}
                  >
                    {offeringData.terms.map((item, idx) => (
                      <AccordionItem
                        key={idx.toString()}
                        aria-label={item.title}
                        title={item.title}
                      >
                        {item.content}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardBody>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default OfferingDetailsPage;
