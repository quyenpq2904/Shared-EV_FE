import { Card, CardBody, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor?: string;
  iconBg?: string;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
}

const StatsCard = ({
  title,
  value,
  icon,
  iconColor = "text-default-500",
  iconBg = "bg-default-100",
  trend,
  trendType,
}: StatsCardProps) => {
  return (
    <Card className="border border-default-200 shadow-sm h-full bg-content1">
      <CardBody className="p-4 md:p-5">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
            >
              <Icon icon={icon} className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-default-500 font-medium mb-1">
                {title}
              </p>
              <h3 className="text-2xl font-bold text-default-900">{value}</h3>
            </div>
          </div>
          {trend && (
            <Chip
              color={
                trendType === "up"
                  ? "success"
                  : trendType === "down"
                  ? "danger"
                  : "default"
              }
              variant="flat"
              size="sm"
              startContent={
                <Icon
                  icon={
                    trendType === "up"
                      ? "solar:arrow-up-linear"
                      : trendType === "down"
                      ? "solar:arrow-down-linear"
                      : "solar:minus-linear"
                  }
                  className="text-sm"
                />
              }
              className="font-medium px-1"
            >
              {trend}
            </Chip>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
