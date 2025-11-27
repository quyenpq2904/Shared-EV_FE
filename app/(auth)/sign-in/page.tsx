"use client";

import React from "react";
import authApi from "@/apis/auth/auth";
import { ILoginRequest } from "@/apis/auth/auth-req.type";
import AppIcon from "@/components/AppIcon";
import InputControl from "@/components/InputControl";
import { useAuthContext } from "@/contexts/AuthContext";
import { addToast, Button, Checkbox, Divider, Form, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

function SignInPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const { login } = useAuthContext();
  const formMethods = useForm<ILoginRequest>();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const loginMutaion = useMutation({
    mutationFn: (body: ILoginRequest) => authApi.login(body),
  });

  const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
    loginMutaion.mutate(data, {
      onSuccess: (response) => {
        const { accessToken, refreshToken } = response.data;
        login({ accessToken, refreshToken });
        addToast({
          title: "Login Successful",
          description: "Login successful! Redirecting to homepage...",
          color: "success",
        });
        router.push("/");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message;
        addToast({
          title: "Login Failed",
          description: errorMessage || "An error occurred during login.",
          color: "danger",
        });
      },
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col items-center pb-6">
          <AppIcon size={60} />
          <p className="text-xl font-medium">Welcome Back</p>
          <p className="text-small text-default-600">
            Log in to your account to continue
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <InputControl<ILoginRequest>
            register={formMethods.register}
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <InputControl<ILoginRequest>
            register={formMethods.register}
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-700" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-600 shrink-0">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            startContent={
              <Icon className="text-default-600" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            Continue with Github
          </Button>
        </div>
        <p className="text-small text-center">
          Need to create an account?&nbsp;
          <Link href="/sign-up" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SignInPage;
