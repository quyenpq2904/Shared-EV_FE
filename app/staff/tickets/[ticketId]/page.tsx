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

const ticketData = {
  id: "#346520",
  title: "Sidebar not responsive on mobile",
  date: "Mon, 3:20 PM (2 days ago)",
  status: "In Progress",
  pagination: { current: 4, total: 120 },
  customer: {
    name: "John Doe",
    email: "jhondelin@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  details: {
    customer: "John Doe",
    email: "jhondelin@gmail.com",
    category: "General Support",
    created: "Dec 20, 2028",
  },
  messages: [
    {
      id: 1,
      author: "John Doe",
      email: "jhondelin@gmail.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      role: "Customer",
      time: "Mon, 3:20 PM (2 hrs ago)",
      content: `Hi TailAdmin Team,
I hope you're doing well.
I'm currently working on customizing the TailAdmin dashboard and would like to add a new section labeled "Reports." Before I proceed, I wanted to check if there's any official guide or best practice you recommend for adding custom pages within the TailAdmin structure.`,
    },
    {
      id: 2,
      author: "Musharof Chowdhury",
      email: "From - tailadmin support team",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
      role: "Support",
      time: "Mon, 3:20 PM (2 hrs ago)",
      content: `Hi John D,
Thanks for reaching out—and great to hear you're customizing TailAdmin to fit your needs! Yes, you can definitely add custom pages like a "Reports" section, and it's quite straightforward. Here's a quick guide to help you get started:`,
    },
  ],
};

function TicketDetail() {
  const router = useRouter();
  const [status, setStatus] = React.useState("in-progress");

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button
          variant="light"
          color="default"
          startContent={<Icon icon="solar:arrow-left-linear" />}
          onPress={() => router.back()}
          className="font-medium text-default-700"
        >
          Back to Ticket List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="border border-default-200 shadow-sm">
            <CardBody className="p-0">
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
                  <Button
                    variant="light"
                    startContent={
                      <Icon icon="solar:paperclip-linear" className="text-xl" />
                    }
                  >
                    Attach
                  </Button>
                  <Button color="primary" className="font-medium px-8">
                    Reply
                  </Button>
                </div>

                <Divider className="my-6" />

                <div className="flex items-center gap-4">
                  <span className="font-semibold text-default-700 text-small">
                    Status:
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
                      Solved
                    </Radio>
                    <Radio value="on-hold" color="warning">
                      On-Hold
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

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
                    #{ticketData.id.replace("#", "")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-600">Category</span>
                  <span className="text-small font-medium text-default-900">
                    {ticketData.details.category}
                  </span>
                </div>
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
