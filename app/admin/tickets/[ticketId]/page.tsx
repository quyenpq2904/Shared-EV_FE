"use client";

import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

// --- MOCK DATA: Context Shared-EV (Financial Dispute) ---
const ticketData = {
  id: "#EV-BILL-9901",
  title: "Dispute: Unauthorized Cleaning Fee Charge",
  date: "Tue, 09:15 AM (4 hours ago)",
  status: "In Progress",
  pagination: { current: 5, total: 20 },
  customer: {
    name: "Sarah Conner",
    email: "sarah.c@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026702d",
  },
  details: {
    customer: "Sarah Conner",
    email: "sarah.c@example.com",
    category: "Billing & Refund", // Danh mục liên quan đến tiền
    vehicle: "VinFast VF8 Eco",
    bookingId: "#BK-2025-8821", // ✅ Đã đổi từ Trip ID sang Booking ID
    created: "Oct 25, 2025",
  },
  messages: [
    {
      id: 1,
      author: "Sarah Conner",
      email: "sarah.c@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026702d",
      role: "Customer",
      time: "Tue, 09:15 AM (4 hours ago)",
      content: `Hello Support,
I just checked my bank statement and noticed an extra charge of $50 for "Cleaning Fee" on my recent booking (#BK-2025-8821).
I returned the car in perfect condition, exactly how I received it. I even vacuumed the mats before handing it over. This charge is incorrect. Please refund this amount immediately or provide proof of why I was charged.`,
    },
    {
      id: 2,
      author: "SharedEV Admin",
      email: "From - Billing Support",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
      role: "Support",
      time: "Tue, 10:30 AM (2 hours ago)",
      content: `Hi Sarah,
Thank you for contacting us regarding this charge. I understand your concern.
The $50 fee was initiated by the car owner, claiming there were coffee stains on the rear seat. However, per our "Fair Billing Policy", owners must provide photo evidence within 1 hour of the return.
I have put this transaction on hold. I am currently reviewing the "Post-trip Evidence" photos uploaded by both you and the owner. If the evidence is insufficient, we will process a full refund to your wallet within 24 hours.`,
    },
  ],
};

function TicketDetail() {
  const router = useRouter();
  const [status, setStatus] = React.useState("in-progress");

  return (
    <div>
      {/* Header Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="light"
          color="default"
          startContent={<Icon icon="solar:arrow-left-linear" />}
          onPress={() => router.back()}
          className="font-medium text-default-700"
        >
          Back to Support Center
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* --- LEFT COLUMN: CONVERSATION --- */}
        <div className="lg:col-span-3">
          <Card className="border border-default-200 shadow-sm">
            <CardBody className="p-0">
              {/* Ticket Header */}
              <div className="p-6 flex flex-row justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-default-900">
                      Ticket {ticketData.id} - {ticketData.title}
                    </h1>
                  </div>
                  <p className="text-small text-default-600 mt-1">
                    {ticketData.date}
                  </p>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-3">
                  <span className="text-small text-default-600">
                    {ticketData.pagination.current} of{" "}
                    {ticketData.pagination.total}
                  </span>
                  <div className="flex gap-1">
                    <Button isIconOnly size="sm" variant="bordered">
                      <Icon icon="solar:alt-arrow-left-linear" />
                    </Button>
                    <Button isIconOnly size="sm" variant="bordered">
                      <Icon icon="solar:alt-arrow-right-linear" />
                    </Button>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Messages List */}
              <div className="p-6 flex flex-col gap-8">
                {ticketData.messages.map((msg, index) => (
                  <div key={msg.id}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3">
                        <Avatar src={msg.avatar} size="md" />
                        <div>
                          <p className="font-bold text-default-900 text-small">
                            {msg.author}
                          </p>
                          <p className="text-tiny text-default-600">
                            {msg.email}
                          </p>
                        </div>
                      </div>
                      <span className="text-tiny text-default-600">
                        {msg.time}
                      </span>
                    </div>
                    <div className="text-small text-default-600 whitespace-pre-line pl-12 leading-relaxed">
                      {msg.content}
                    </div>
                    {index < ticketData.messages.length - 1 && (
                      <Divider className="mt-8" />
                    )}
                  </div>
                ))}
              </div>

              <Divider />

              {/* Reply Section */}
              <div className="p-6 bg-default-50/50">
                <Textarea
                  placeholder="Type your reply here..."
                  minRows={5}
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "bg-white dark:bg-content1 border-default-200 shadow-none",
                  }}
                />

                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <Button
                      variant="light"
                      startContent={
                        <Icon
                          icon="solar:paperclip-linear"
                          className="text-xl"
                        />
                      }
                    >
                      Attach File
                    </Button>
                    <Button
                      variant="light"
                      startContent={
                        <Icon icon="solar:wallet-linear" className="text-xl" />
                      }
                      className="text-success-600"
                    >
                      Issue Refund
                    </Button>
                  </div>
                  <Button color="primary" className="font-medium px-8">
                    Reply
                  </Button>
                </div>

                <Divider className="my-6" />

                <div className="flex items-center gap-4">
                  <span className="font-semibold text-default-700 text-small">
                    Update Status:
                  </span>
                  <RadioGroup
                    orientation="horizontal"
                    value={status}
                    onValueChange={setStatus}
                    classNames={{ wrapper: "gap-6" }}
                  >
                    <Radio value="in-progress" color="primary">
                      In-Progress
                    </Radio>
                    <Radio value="solved" color="success">
                      Resolved
                    </Radio>
                    <Radio value="escalated" color="warning">
                      Escalated
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* --- RIGHT COLUMN: TICKET DETAILS --- */}
        <div className="lg:col-span-1">
          <Card className="border border-default-200 shadow-sm sticky top-6">
            <CardBody className="p-6">
              <h3 className="font-bold text-lg mb-6">Ticket Details</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">Customer</span>
                  <span className="text-small font-medium text-default-900 text-right">
                    {ticketData.details.customer}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">Email</span>
                  <span className="text-small font-medium text-default-900 text-right break-all pl-4">
                    {ticketData.details.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">Ticket ID</span>
                  <span className="text-small font-medium text-default-900">
                    {ticketData.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">Category</span>
                  <span className="text-small font-medium text-default-900">
                    {ticketData.details.category}
                  </span>
                </div>

                {/* --- UPDATED FIELDS FOR SHARED-EV --- */}
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">Vehicle</span>
                  <span className="text-small font-medium text-default-900 text-right">
                    {ticketData.details.vehicle}
                  </span>
                </div>
                {/* ✅ Booking ID replaces Trip ID */}
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">
                    Booking ID
                  </span>
                  <span className="text-small font-medium text-primary cursor-pointer hover:underline">
                    {ticketData.details.bookingId}
                  </span>
                </div>
                {/* ------------------------------- */}

                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">Created</span>
                  <span className="text-small font-medium text-default-900">
                    {ticketData.details.created}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">Status</span>
                  <Chip
                    color="primary"
                    variant="flat"
                    size="sm"
                    className="font-medium"
                  >
                    In Progress
                  </Chip>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;
