"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";

export interface CoOwner {
  id: string;
  name: string;
  color: "success" | "warning" | "secondary" | "default";
  hex: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  ownerId: string;
  isConflict?: boolean;
}

export const coOwners: CoOwner[] = [
  { id: "me", name: "Alex Miller (You)", color: "default", hex: "#3f3f46" },
  { id: "jane", name: "Jane Doe", color: "success", hex: "#17c964" },
  { id: "sam", name: "Sam Wilson", color: "warning", hex: "#f5a524" },
  { id: "emily", name: "Emily Carter", color: "secondary", hex: "#9353d3" },
];

export const cars = [
  { key: "tesla", label: "Tesla Model Y" },
  { key: "ford", label: "Ford Mustang Mach-E" },
];

export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Alex Miller",
    date: new Date(2024, 9, 5), // Tháng 9 là tháng 10 (index 0)
    startTime: "9am",
    endTime: "11am",
    ownerId: "me",
  },
  {
    id: "2",
    title: "Jane Doe",
    date: new Date(2024, 9, 8),
    startTime: "1pm",
    endTime: "4pm",
    ownerId: "jane",
  },
  {
    id: "3",
    title: "Sam Wilson",
    date: new Date(2024, 9, 11),
    startTime: "8am",
    endTime: "12pm",
    ownerId: "sam",
  },
  {
    id: "4",
    title: "Booking Conflict",
    date: new Date(2024, 9, 11),
    startTime: "12pm",
    endTime: "2pm",
    ownerId: "emily",
    isConflict: true,
  },
];

function SchedulesPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); // Oct 2024

  // --- LOGIC CALENDAR ---
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // Tạo mảng tất cả các ngày cần hiển thị trong lưới (bao gồm cả ngày đệm của tháng trước/sau)
  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Chuyển tháng
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Helper tìm event trong ngày
  const getEventsForDay = (day: Date) => {
    return mockEvents.filter((event) => isSameDay(event.date, day));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-default-900">EV Schedule</h1>
          <p className="text-default-600">
            Schedule your EV usage, view real-time availability, and manage
            bookings.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            className="min-w-40"
            placeholder="Select a car"
            defaultSelectedKeys={"all"}
          >
            {cars.map((car) => (
              <SelectItem key={car.key}>{car.label}</SelectItem>
            ))}
          </Select>
          <Button variant="shadow" className="font-bold">
            Book
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card className="border border-default-200 shadow-sm h-full">
            <CardBody className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Button isIconOnly variant="light" onPress={prevMonth}>
                  <Icon
                    icon="solar:alt-arrow-left-linear"
                    className="text-xl"
                  />
                </Button>
                <h2 className="text-xl font-bold text-default-900">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <Button isIconOnly variant="light" onPress={nextMonth}>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="text-xl"
                  />
                </Button>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-semibold text-default-800 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 border-t border-l border-default-200 gap-[1px] bg-default-200">
                {calendarDays.map((day, idx) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentMonth = isSameMonth(day, monthStart);
                  const hasConflict = dayEvents.some((e) => e.isConflict);

                  return (
                    <div
                      key={day.toString()}
                      className={`min-h-[100px] p-2 relative flex flex-col bg-background gap-1 transition-colors
                        ${
                          !isCurrentMonth
                            ? "text-default-500"
                            : "text-default-700"
                        }
                        ${hasConflict ? "bg-danger-50/30" : ""}
                      `}
                    >
                      <span
                        className={`text-sm font-medium ${
                          !isCurrentMonth ? "opacity-50" : ""
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                      <div className="flex flex-col gap-1 mt-1">
                        {dayEvents.map((event) => {
                          const owner = coOwners.find(
                            (c) => c.id === event.ownerId
                          );

                          let bgClass = "bg-default-100 text-default-700";
                          if (owner?.color === "success")
                            bgClass = "bg-[#17c964] text-white";
                          if (owner?.color === "warning")
                            bgClass = "bg-[#f5a524] text-white";
                          if (owner?.color === "secondary")
                            bgClass = "bg-[#9353d3] text-white";

                          return (
                            <div
                              key={event.id}
                              className={`text-[10px] p-1.5 rounded-md leading-tight ${bgClass} shadow-sm`}
                            >
                              <p className="font-bold truncate">
                                {event.title}
                              </p>
                              <p className="opacity-90">
                                {event.startTime} - {event.endTime}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border border-default-200 shadow-sm">
            <CardHeader className="px-6 pt-6 pb-0">
              <h3 className="font-bold text-lg text-default-900">
                Co-owner Legend
              </h3>
            </CardHeader>
            <CardBody className="p-6 flex flex-col gap-4">
              {coOwners.map((owner) => (
                <div key={owner.id} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: owner.hex }}
                  />
                  <span className="text-default-600 text-sm font-medium">
                    {owner.name}
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="border border-default-200 shadow-sm">
            <CardHeader className="px-6 pt-6 pb-0">
              <h3 className="font-bold text-lg text-default-900">
                My Upcoming Bookings
              </h3>
            </CardHeader>
            <CardBody className="p-6 flex flex-col gap-3">
              <div className="border border-default-200 rounded-xl p-4">
                <p className="font-bold text-default-900 text-sm">
                  Today, 2:00 PM - 5:00 PM
                </p>
                <p className="text-xs text-default-500 mt-1">
                  Quick trip to the grocery store.
                </p>
              </div>
              <div className="border border-default-200 rounded-xl p-4">
                <p className="font-bold text-default-900 text-sm">
                  Oct 17, 9:00 AM - 11:00 AM
                </p>
                <p className="text-xs text-default-500 mt-1">
                  Doctor&apos;s Appointment
                </p>
              </div>
              <div className="border border-default-200 rounded-xl p-4">
                <p className="font-bold text-default-900 text-sm">
                  Oct 25, 6:00 PM - 9:00 PM
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-danger-200 bg-danger-50 shadow-sm">
            <CardBody className="p-4 flex flex-row gap-4 items-start">
              <div className="mt-1">
                <Icon
                  icon="solar:danger-triangle-linear"
                  className="text-danger text-2xl"
                />
              </div>
              <div>
                <h4 className="font-bold text-danger text-base">
                  Booking Conflict
                </h4>
                <p className="text-danger-600 text-sm mt-1 leading-relaxed">
                  A scheduling conflict was detected on Oct 11. Please review
                  and resolve.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SchedulesPage;
