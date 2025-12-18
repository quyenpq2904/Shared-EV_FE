"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  CheckboxGroup,
  Image,
  Input,
  Pagination,
  Progress,
  Select,
  SelectItem,
  Slider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { IOffering } from "@/types/Offering";
import { formatCurrency } from "@/lib/utils/currency";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import Link from "next/link";

const mockOfferings: IOffering[] = Array.from({ length: 16 }).map(
  (_, index) => {
    const brands = ["Tesla", "Rivian", "Ford", "Porsche"];
    const models = ["Model Y", "R1T", "Mustang Mach-E", "Taycan"];
    const locations = [
      "Los Angeles, CA",
      "Denver, CO",
      "Miami, FL",
      "New York, NY",
    ];
    const colors = ["White", "Blue", "Gray", "Black"];
    const images = [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1669649514436-09259795cf58?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1696599622732-d304443939d2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614207212035-c5432d677688?q=80&w=1000&auto=format&fit=crop",
    ];

    const i = index % 4;

    return {
      id: `${index}`,
      year: 2022 + (index % 3),
      make: brands[i],
      model: models[i],
      location: locations[i],
      image: images[i],
      range: 250 + index * 10,
      seats: i === 1 ? 5 : 4,
      color: colors[i],
      sharePercentage: [25, 50, 10, 20][i],
      pricePerShare: [12500, 38000, 4800, 22000][i],
      sharesSold: 2,
      totalShares: 10,
      totalValue: 50000 + index * 1000,
      status: "active",
      isLiked: index % 3 === 0,
    };
  }
);

const FiltersSidebar = () => {
  return (
    <div className="p-5 bg-default-100 rounded-2xl border border-default-100/5 h-fit space-y-6 sticky top-16">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Filters</h2>
      </div>

      <Input
        placeholder="Search by make, model"
        variant="flat"
        startContent={
          <Icon icon="solar:magnifer-linear" className="text-default-600" />
        }
      />

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold">Price Range</span>
        </div>
        <Slider
          size="sm"
          step={500}
          minValue={0}
          maxValue={50000}
          defaultValue={[5000, 25000]}
          formatOptions={{
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
          }}
        />
        <div className="flex justify-between text-xs text-foreground mt-2">
          <span>5,000,000 VND</span>
          <span>25,000,000 VND</span>
        </div>
      </div>

      <Accordion
        selectionMode="multiple"
        defaultExpandedKeys={["1", "2"]}
        itemClasses={{
          title: "text-small font-medium",
          trigger: "py-3 px-0",
          indicator: "text-default-800",
          content: "pb-4",
        }}
        showDivider={false}
      >
        <AccordionItem key="1" aria-label="Location" title="Location">
          <CheckboxGroup color="success" classNames={{ wrapper: "gap-2" }}>
            <Checkbox value="la" classNames={{ label: "text-small" }}>
              Los Angeles, CA
            </Checkbox>
            <Checkbox value="ny" classNames={{ label: "text-small" }}>
              New York, NY
            </Checkbox>
            <Checkbox value="mi" classNames={{ label: "text-small" }}>
              Miami, FL
            </Checkbox>
          </CheckboxGroup>
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="Vehicle Make/Model"
          title="Vehicle Make/Model"
        >
          <CheckboxGroup color="success" classNames={{ wrapper: "gap-2" }}>
            <Checkbox value="tesla" classNames={{ label: "text-small" }}>
              Tesla
            </Checkbox>
            <Checkbox value="rivian" classNames={{ label: "text-small" }}>
              Rivian
            </Checkbox>
            <Checkbox value="ford" classNames={{ label: "text-small" }}>
              Ford
            </Checkbox>
          </CheckboxGroup>
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="Share Percentage"
          title="Share Percentage"
        >
          <p className="text-tiny">Select share size...</p>
        </AccordionItem>

        <AccordionItem
          key="4"
          aria-label="Vehicle Year"
          title="Vehicle Year/Mileage"
        >
          <p className="text-tiny">Select year range...</p>
        </AccordionItem>
      </Accordion>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Button color="success" variant="solid" className="font-semibold">
          Apply Filter
        </Button>
        <Button variant="solid" className="font-semibold">
          Reset
        </Button>
      </div>
    </div>
  );
};

const OfferingCard = ({ item }: { item: IOffering }) => {
  return (
    <Card className="group">
      <div className="relative p-3 pb-0">
        <div className="relative w-full aspect-16/10 overflow-hidden rounded-xl bg-foreground/10">
          <Image
            removeWrapper
            alt={item.model}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            src={item.image}
          />
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            className={`absolute top-2 right-2 z-10 ${
              item.isLiked
                ? "bg-black/60 text-danger"
                : "bg-black/40 text-white hover:bg-black/60"
            }`}
            size="sm"
          >
            <Icon
              icon={item.isLiked ? "solar:heart-bold" : "solar:heart-linear"}
              className="text-lg"
            />
          </Button>
        </div>
      </div>

      <CardBody className="px-4 py-4 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-bold text-foreground truncate">
            {item.year} {item.make} {item.model}
          </h3>
          <p className="text-small text-default-600">{item.location}</p>
        </div>

        <div className="flex items-center gap-4 text-small text-default-600">
          <div className="flex items-center gap-1.5">
            <Icon icon="solar:route-linear" className="text-[#00E396]" />
            <span>{item.range} mi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon
              icon="solar:users-group-rounded-linear"
              className="text-[#00E396]"
            />
            <span>{item.seats} seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full border border-foreground/20"
              style={{ backgroundColor: item.color.toLowerCase() }}
            />
            <span>{item.color}</span>
          </div>
        </div>

        <div className="mt-1 flex flex-col gap-1">
          <span className="text-small text-default-500">Price per share</span>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-blue-700">
              {formatCurrency(item.pricePerShare)}
            </span>
            <span className="text-small text-default-500 mb-1">
              Sold {item.sharesSold}/{item.totalShares}
            </span>
          </div>
          <Progress
            aria-label="Shares sold"
            value={item.sharesSold}
            maxValue={item.totalShares}
            size="sm"
            classNames={{
              indicator: "bg-blue-700",
              track: "bg-default-100",
            }}
            radius="full"
          />
        </div>
      </CardBody>

      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          as={Link}
          href={`/offerings/2023-tesla-model-y-long-range`}
          className="font-semibold"
          fullWidth
          color="success"
          variant="flat"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

function OfferingsPage() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const pages = Math.ceil(mockOfferings.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return mockOfferings.slice(start, end);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto mt-5 mb-10 px-6">
      <AppBreadcrumb />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="hidden lg:block lg:col-span-3">
          <FiltersSidebar />
        </div>

        <div className="lg:col-span-9 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">Find Your EV Share</h1>

            <div className="flex gap-3">
              <div className="rounded-lg px-1 flex border border-default-100/5">
                <Button isIconOnly>
                  <Icon icon="solar:widget-2-bold" className="text-lg" />
                </Button>
                <Button isIconOnly variant="light">
                  <Icon icon="solar:list-bold" className="text-lg" />
                </Button>
              </div>

              <Select
                className="w-[200px]"
                defaultSelectedKeys={["new"]}
                placeholder="Sort by"
                aria-label="Sort options"
                selectorIcon={<Icon icon="solar:alt-arrow-down-linear" />}
              >
                <SelectItem key="new">Newly Listed</SelectItem>
                <SelectItem key="price_low">Price: Low to High</SelectItem>
                <SelectItem key="price_high">Price: High to Low</SelectItem>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item) => (
              <OfferingCard key={item.id} item={item} />
            ))}
          </div>

          {pages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                isCompact
                showControls
                showShadow
                color="success"
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfferingsPage;
