"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Divider,
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
import { useState, useMemo } from "react";

// ✅ IMPORT COMPONENT MỚI
import VerticalStepper from "@/components/VerticalStepper";

// ============================================================================
// 1. TYPE DEFINITIONS
// ============================================================================

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

// ============================================================================
// 2. MOCK DATA & HELPERS
// ============================================================================

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

// Helper: Tạo sự kiện động theo tháng hiện tại để luôn có data hiển thị
const createDynamicEvents = (): CalendarEvent[] => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return [
    {
      id: "1",
      title: "Alex Miller",
      date: new Date(year, month, 5),
      startTime: "9am",
      endTime: "11am",
      ownerId: "me",
    },
    {
      id: "2",
      title: "Jane Doe",
      date: new Date(year, month, 8),
      startTime: "1pm",
      endTime: "4pm",
      ownerId: "jane",
    },
    {
      id: "3",
      title: "Sam Wilson",
      date: new Date(year, month, 11),
      startTime: "8am",
      endTime: "12pm",
      ownerId: "sam",
    },
    {
      id: "4",
      title: "Booking Conflict",
      date: new Date(year, month, 11),
      startTime: "12pm",
      endTime: "2pm",
      ownerId: "emily",
      isConflict: true,
    },
  ];
};

// Dữ liệu cho Vertical Stepper trong Modal
const bookingSteps = [
  {
    title: "Request Submitted",
    description: "June 1st, 10:00 AM",
  },
  {
    title: "Group Voting",
    description: "Waiting for other co-owners...",
  },
  {
    title: "Booking Confirmed",
    description: "Pending final approval",
  },
];

// ============================================================================
// 3. COMPONENT ĐẾM NGƯỢC (Local)
// ============================================================================

const CountdownTimer = () => {
  return (
    <div className="flex gap-4 justify-center my-6">
      {[
        { val: 23, label: "Hours" },
        { val: 59, label: "Minutes" },
        { val: 55, label: "Seconds" },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <div className="bg-[#1A2629] w-20 h-16 rounded-lg flex items-center justify-center border border-default-100/10 shadow-inner">
            <span className="text-2xl font-bold text-white">{item.val}</span>
          </div>
          <span className="text-xs text-default-400 uppercase tracking-wide font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// 4. MAIN COMPONENT
// ============================================================================

function SchedulesPage() {
  // State Calendar
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const events = useMemo(() => createDynamicEvents(), []);

  // State Booking
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSuccess, setIsSuccess] = useState(false);

  // Logic Calendar Grid
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.date, day));
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
  };

  const handleOpenBooking = () => {
    if (!selectedDate) setSelectedDate(today);
    setIsSuccess(false);
    onOpen();
  };

  const handleConfirmBooking = () => {
    // Giả lập delay API
    setTimeout(() => {
      setIsSuccess(true);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* --- PAGE HEADER --- */}
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
          <Button
            variant="shadow"
            className="font-bold"
            onPress={handleOpenBooking}
          >
            Book
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* --- LEFT COLUMN: CALENDAR --- */}
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
                <h2 className="text-xl font-bold text-default-900 capitalize">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <Button isIconOnly variant="light" onPress={nextMonth}>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="text-xl"
                  />
                </Button>
              </div>

              {/* Days Header */}
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

              {/* Days Grid */}
              <div className="grid grid-cols-7 border-t border-l border-default-200 gap-[1px] bg-default-200">
                {calendarDays.map((day) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentMonth = isSameMonth(day, monthStart);
                  const hasConflict = dayEvents.some((e) => e.isConflict);
                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, today);

                  // Style Logic
                  let bgClass = "bg-background";
                  if (!isCurrentMonth) bgClass = "bg-default-50/50";
                  if (isToday) bgClass = "bg-blue-50/80 dark:bg-blue-900/20";
                  if (hasConflict) bgClass = "bg-danger-50/50";
                  const borderClass = isSelected
                    ? "ring-2 ring-inset ring-primary z-10"
                    : "";

                  return (
                    <div
                      key={day.toString()}
                      onClick={() => handleDayClick(day)}
                      className={`min-h-[100px] p-2 relative flex flex-col gap-1 transition-all cursor-pointer hover:bg-default-100 ${bgClass} ${borderClass} ${
                        !isCurrentMonth
                          ? "text-default-400"
                          : "text-default-700"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${
                          isToday
                            ? "bg-primary text-white font-bold shadow-sm"
                            : "font-medium"
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                      <div className="flex flex-col gap-1 mt-1">
                        {dayEvents.map((event) => {
                          const owner = coOwners.find(
                            (c) => c.id === event.ownerId
                          );
                          let eventBg = "bg-default-100 text-default-700";
                          if (owner?.color === "success")
                            eventBg = "bg-[#17c964] text-white";
                          if (owner?.color === "warning")
                            eventBg = "bg-[#f5a524] text-white";
                          if (owner?.color === "secondary")
                            eventBg = "bg-[#9353d3] text-white";

                          return (
                            <div
                              key={event.id}
                              className={`text-[10px] p-1.5 rounded-md leading-tight ${eventBg} shadow-sm`}
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

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Legend */}
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

          {/* Bookings */}
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
                  {format(
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      17
                    ),
                    "MMM d"
                  )}
                  , 9:00 AM - 11:00 AM
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Alert */}
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
                  A scheduling conflict was detected on{" "}
                  {format(
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      11
                    ),
                    "MMM d"
                  )}
                  . Please review.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton={isSuccess}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {!isSuccess && (
                <ModalHeader className="flex flex-col gap-1">
                  Book a Time Slot
                </ModalHeader>
              )}

              <ModalBody className={isSuccess ? "p-0" : ""}>
                {isSuccess ? (
                  <div className="flex flex-col items-center text-center pt-10 pb-6 px-6 w-full">
                    <Icon
                      icon="solar:hourglass-line-bold"
                      className="text-warning text-5xl mb-4"
                    />

                    <h2 className="text-2xl font-bold">Pending Approval</h2>
                    <p className="text-default-500 text-sm mt-1">
                      Auto-approval in...
                    </p>

                    <CountdownTimer />

                    <Divider className="w-full my-4" />

                    <div className="w-full text-left px-4 pl-2">
                      <VerticalStepper steps={bookingSteps} currentStep={1} />
                    </div>

                    <Button
                      variant="bordered"
                      color="danger"
                      className="mt-6 font-medium"
                      fullWidth
                      startContent={<Icon icon="solar:close-circle-linear" />}
                      onPress={onClose}
                    >
                      Cancel Request
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-small text-default-600">
                      Select time for{" "}
                      <span className="font-bold">
                        {selectedDate ? format(selectedDate, "PPPP") : ""}
                      </span>
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="time"
                        label="Start Time"
                        defaultValue="09:00"
                      />
                      <Input
                        type="time"
                        label="End Time"
                        defaultValue="11:00"
                      />
                    </div>
                    <Input label="Purpose" placeholder="e.g., Grocery run" />
                  </div>
                )}
              </ModalBody>

              {!isSuccess && (
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    className="font-bold"
                    onPress={handleConfirmBooking}
                  >
                    Confirm Booking
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SchedulesPage;
