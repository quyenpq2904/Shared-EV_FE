"use client";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const Result = () => {
  return (
    <div className="w-full flex justify-center">
      <Card>
        <CardBody className="p-10 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center">
            <Icon
              icon="solar:verified-check-bold"
              className="text-5xl text-success-500"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">
              Your Offering is Under Review
            </h2>
            <p className="text-default-600 max-w-md mx-auto">
              Thank you! We have received your share offering submission. Our
              team will review it for quality and accuracy before it goes live.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              as={Link}
              href="/dashboard"
              variant="bordered"
              className="font-medium border-default-200"
            >
              Go to Dashboard
            </Button>
            <Button
              as={Link}
              href="/my-garage"
              color="success"
              variant="shadow"
              className="font-bold"
            >
              View My Offerings
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
