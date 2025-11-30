"use client";

import React from "react";
import { cn } from "@heroui/react";
import { Icon } from "@iconify/react";

export interface StepItem {
  title: string;
  description: string;
}

interface VerticalStepperProps {
  steps: StepItem[];
  currentStep: number;
}

const VerticalStepper = ({ steps, currentStep }: VerticalStepperProps) => {
  return (
    <div className="relative pl-8 ml-2">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className={cn("relative", !isLast && "pb-10")}>
            {!isLast && (
              <div
                className={cn(
                  "absolute -left-[27px] top-2 w-[2px] h-[calc(100%+10px)]",
                  isCompleted ? "bg-primary" : "bg-default-400"
                )}
              />
            )}

            <div
              className={cn(
                "absolute -left-[42px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 bg-background transition-colors duration-300",
                isActive
                  ? "border-primary text-primary shadow-[0_0_10px_rgba(0,112,243,0.3)]"
                  : isCompleted
                  ? "border-primary bg-primary text-black"
                  : "border-default-500 text-default-500"
              )}
            >
              {isCompleted ? (
                <Icon icon="solar:check-read-linear" className="text-lg" />
              ) : (
                <span className="text-sm font-bold">{index + 1}</span>
              )}
            </div>

            <div className="flex flex-col gap-0.5">
              <p
                className={cn(
                  "text-base font-bold transition-colors duration-300",
                  isActive || isCompleted
                    ? "text-default-800"
                    : "text-default-500"
                )}
              >
                {step.title}
              </p>
              <p className="text-xs text-default-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VerticalStepper;
