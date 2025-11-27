"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Tab,
  Tabs,
  Chip,
  CircularProgress,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
} from "recharts";
import StatsCard from "@/components/StatsCard";

const monthlySalesData = [
  { name: "Jan", value: 150 },
  { name: "Feb", value: 380 },
  { name: "Mar", value: 180 },
  { name: "Apr", value: 290 },
  { name: "May", value: 170 },
  { name: "Jun", value: 180 },
  { name: "Jul", value: 280 },
  { name: "Aug", value: 90 },
  { name: "Sep", value: 200 },
  { name: "Oct", value: 390 },
  { name: "Nov", value: 270 },
  { name: "Dec", value: 95 },
];

const statisticsData = [
  { name: "Jan", value: 180 },
  { name: "Feb", value: 190 },
  { name: "Mar", value: 170 },
  { name: "Apr", value: 160 },
  { name: "May", value: 175 },
  { name: "Jun", value: 165 },
  { name: "Jul", value: 170 },
  { name: "Aug", value: 205 },
  { name: "Sep", value: 230 },
  { name: "Oct", value: 210 },
  { name: "Nov", value: 240 },
  { name: "Dec", value: 235 },
];

const MonthlyTargetCard = () => (
  <Card className="border border-default-200 shadow-sm h-full">
    <CardHeader className="flex justify-between items-start px-6 pt-6 pb-0">
      <div>
        <h3 className="text-lg font-bold text-default-900">Monthly Target</h3>
        <p className="text-small text-default-500">
          Target you&apos;ve set for each month
        </p>
      </div>
      <Button isIconOnly size="sm" variant="light">
        <Icon
          icon="solar:menu-dots-bold"
          className="text-default-400 text-xl"
        />
      </Button>
    </CardHeader>
    <CardBody className="flex flex-col items-center justify-center py-8 overflow-hidden">
      <div className="relative flex items-center justify-center">
        <CircularProgress
          classNames={{
            svg: "w-48 h-48 drop-shadow-md",
            indicator: "stroke-primary",
            track: "stroke-default-100",
            value: "text-3xl font-bold text-default-900",
          }}
          value={75.55}
          strokeWidth={3}
          showValueLabel={false} // Tắt label mặc định để tự custom
        />
        {/* Custom Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-default-900">75.55%</span>
          <Chip
            size="sm"
            color="success"
            variant="flat"
            className="mt-1 font-medium text-[10px] h-5"
          >
            +10%
          </Chip>
        </div>
      </div>
      <p className="text-center text-small text-default-500 mt-4 max-w-[200px]">
        You earn $3287 today, it&apos;s higher than last month. Keep up your
        good work!
      </p>

      <div className="grid grid-cols-3 gap-8 mt-8 w-full px-4">
        <div className="text-center">
          <p className="text-tiny text-default-400 mb-1">Target</p>
          <p className="text-medium font-bold text-default-900 flex items-center justify-center gap-1">
            $20K{" "}
            <Icon
              icon="solar:arrow-down-linear"
              className="text-danger text-xs"
            />
          </p>
        </div>
        <div className="text-center">
          <p className="text-tiny text-default-400 mb-1">Revenue</p>
          <p className="text-medium font-bold text-default-900 flex items-center justify-center gap-1">
            $20K{" "}
            <Icon
              icon="solar:arrow-up-linear"
              className="text-success text-xs"
            />
          </p>
        </div>
        <div className="text-center">
          <p className="text-tiny text-default-400 mb-1">Today</p>
          <p className="text-medium font-bold text-default-900 flex items-center justify-center gap-1">
            $20K{" "}
            <Icon
              icon="solar:arrow-up-linear"
              className="text-success text-xs"
            />
          </p>
        </div>
      </div>
    </CardBody>
  </Card>
);

const MonthlySalesChart = () => {
  return (
    <Card className="border border-default-200 shadow-sm h-full">
      <CardHeader className="flex justify-between items-center px-6 pt-6">
        <h3 className="text-lg font-bold text-default-900">Monthly Sales</h3>
        <Button isIconOnly size="sm" variant="light">
          <Icon
            icon="solar:menu-dots-bold"
            className="text-default-400 text-xl"
          />
        </Button>
      </CardHeader>
      <CardBody className="px-4 pb-4">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySalesData} barSize={12}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {monthlySalesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value > 300 ? "#4338CA" : "#6366F1"} // Highlight cột cao > 300
                    className="transition-all hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};

const StatisticsChart = () => (
  <Card className="border border-default-200 shadow-sm">
    <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 pt-6 gap-4">
      <div>
        <h3 className="text-lg font-bold text-default-900">Statistics</h3>
        <p className="text-small text-default-500">
          Target you&apos;ve set for each month
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Tabs aria-label="Options" variant="light">
          <Tab key="overview" title="Overview" />
          <Tab key="sales" title="Sales" />
          <Tab key="revenue" title="Revenue" />
        </Tabs>
        <Button
          variant="bordered"
          startContent={<Icon icon="solar:calendar-linear" />}
          className="border-default-200 text-default-600 font-medium"
        >
          Nov 20, 2025 - Nov 26, 2025
        </Button>
      </div>
    </CardHeader>
    <CardBody className="px-4 pb-6">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={statisticsData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardBody>
  </Card>
);

function AdminPage() {
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatsCard
              title="Customers"
              value="3,782"
              icon="solar:users-group-rounded-linear"
              trend="+ 11.01%"
              trendType="up"
              iconBg="bg-primary-50"
              iconColor="text-primary"
            />
            <StatsCard
              title="Orders"
              value="5,359"
              icon="solar:box-linear"
              trend="- 9.05%"
              trendType="down"
              iconBg="bg-danger-50"
              iconColor="text-danger"
            />
          </div>

          <MonthlySalesChart />
        </div>
        <div className="lg:col-span-4">
          <MonthlyTargetCard />
        </div>
      </div>
      <div className="mt-5">
        <StatisticsChart />
      </div>
    </div>
  );
}
export default AdminPage;
