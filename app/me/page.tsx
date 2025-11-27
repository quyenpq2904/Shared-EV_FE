"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  Textarea,
  addToast,
} from "@heroui/react";

import InputControl from "@/components/InputControl";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  profileSchema,
  ProfileUpdateReqType,
} from "@/apis/users/users-req.type";

function ProfilePage() {
  const { profile, refetch } = useAuthContext();

  const formMethods = useForm<ProfileUpdateReqType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      bio: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = formMethods;

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName || "",
        phoneNumber: profile.phoneNumber || "",
        bio: profile.bio || "",
      });
    }
  }, [profile, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: ProfileUpdateReqType) => {
      console.log("Submitting:", data);
      // return usersApi.updateProfile(data);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });

  const onSubmit: SubmitHandler<ProfileUpdateReqType> = (data) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        addToast({
          title: "Profile Updated",
          description: "Your information has been saved successfully.",
          color: "success",
        });
        refetch();
        reset(data);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        addToast({
          title: "Update Failed",
          description: error.message || "Something went wrong.",
          color: "danger",
        });
      },
    });
  };

  if (!profile) return null;

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-default-900">Public profile</h1>
      <Divider className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 order-2 md:order-1">
          <Form
            className="flex flex-col gap-6 w-full"
            validationBehavior="native"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1 w-full max-w-lg">
              <InputControl<ProfileUpdateReqType>
                register={register}
                fullWidth
                name="fullName"
                label="Name"
                placeholder="Enter your name"
                variant="bordered"
                labelPlacement="outside"
                classNames={{
                  label: "font-semibold text-default-900",
                  inputWrapper: "bg-transparent border-default-300",
                }}
              />
              <p className="text-tiny text-default-500">
                Your name may appear around the platform where you contribute or
                are mentioned.
              </p>
            </div>

            <div className="flex flex-col gap-1 w-full max-w-lg">
              <Input
                label="Public email"
                value={profile.email}
                fullWidth
                variant="bordered"
                isReadOnly
                labelPlacement="outside"
                classNames={{
                  label: "font-semibold text-default-900",
                  inputWrapper: "bg-transparent border-default-300",
                }}
                endContent={
                  <Icon
                    icon="solar:lock-keyhole-linear"
                    className="text-default-400"
                  />
                }
              />
              <p className="text-tiny text-default-500">
                You have managed your email privacy settings.
              </p>
            </div>

            {/* 3. Bio */}
            <div className="flex flex-col gap-1 w-full max-w-lg">
              <Textarea
                {...register("bio")}
                label="Bio"
                placeholder="Tell us a little bit about yourself"
                variant="bordered"
                labelPlacement="outside"
                minRows={4}
                isInvalid={!!errors.bio}
                errorMessage={errors.bio?.message}
                classNames={{
                  label: "font-semibold text-default-900",
                  inputWrapper: "bg-transparent border-default-300",
                }}
              />
              <p className="text-tiny text-default-500">
                You can @mention other users and organizations to link to them.
              </p>
            </div>

            <div className="flex flex-col gap-1 w-full max-w-lg">
              <InputControl<ProfileUpdateReqType>
                register={register}
                name="phoneNumber"
                label="Phone number"
                placeholder="0912345678"
                type="tel"
                variant="bordered"
                labelPlacement="outside"
                classNames={{
                  label: "font-semibold text-default-900",
                  inputWrapper: "bg-transparent border-default-300",
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2 w-full max-w-lg">
              <Input
                label="Joined"
                value={format(new Date(profile.createdAt), "MMM d, yyyy")}
                isReadOnly
                variant="flat"
                labelPlacement="outside"
                size="sm"
                className="opacity-60"
              />
              <Input
                label="Last updated"
                value={format(new Date(profile.updatedAt), "MMM d, yyyy")}
                isReadOnly
                variant="flat"
                labelPlacement="outside"
                size="sm"
                className="opacity-60"
              />
            </div>

            <div className="mt-4">
              <Button
                color="primary"
                type="submit"
                className="font-medium px-6"
                isLoading={updateMutation.isPending}
                isDisabled={!isDirty || updateMutation.isPending}
              >
                Update profile
              </Button>
            </div>
          </Form>
        </div>

        <div className="md:col-span-4 order-1 md:order-2 flex flex-col gap-2">
          <span className="font-semibold text-default-900">
            Profile picture
          </span>
          <div className="relative group w-fit">
            <Avatar
              src={profile.avatar}
              className="w-64 h-64 text-large border-1 border-default-200"
              name={profile.fullName?.[0]}
            />

            <div className="absolute bottom-4 left-0 w-full flex items-center gap-2 px-2">
              <Button
                size="sm"
                variant="flat"
                className="bg-default-100 shadow-sm border border-default-200 text-default-700 font-medium text-xs flex items-center gap-1"
              >
                <Icon icon="solar:pen-linear" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
