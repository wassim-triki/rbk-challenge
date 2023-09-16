"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import ImageUpload from "./ImageUpload";
import { useEffect } from "react";
import { ProfileFormData, useUser } from "../context";
import { localImageToFile } from "@/lib/utils";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  email: z
    .string()
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Invalid email format",
      }
    ),
  images: z.array(z.unknown()).optional(),
});

const ProfileForm = () => {
  const { setProfile, profile } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      images: profile?.profilePicture ? [profile.profilePicture] : [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let profilePictureFile: File | null = null;
    if (data.images && data.images.length > 0) {
      profilePictureFile = data.images[0] as File;
    } else {
      profilePictureFile = await localImageToFile(
        "/profile-picture-placeholder.png",
        "profile-picture-placeholder.png"
      );
    }
    const formData: ProfileFormData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      profilePicture: profilePictureFile,
    };

    setProfile(formData);
    // console.log(formData);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  type Input = {
    name: "firstName" | "lastName" | "email";
    label: string;
    placeholder: string;
    type: string;
    required: boolean;
  };

  const inputs: Input[] = [
    {
      name: "firstName",
      label: "First name",
      placeholder: "John",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last name",
      placeholder: "Doe",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "johndoe@example.com",
      type: "email",
      required: false,
    },
  ];

  const accept = {
    "image/png": [".png"],
    "image/jpeg": [".jpeg", ".jpg"],
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        id="profile-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ImageUpload accept={accept} name="images" label="Profile picture" />
        <div className="flex flex-col gap-1 rounded-lg bg-muted p-4">
          {inputs.map(({ name, label, required, placeholder }) => (
            <FormField
              control={form.control}
              name={name}
              key={name}
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="flex-1 text-muted-foreground font-normal">
                    {label}
                    {required && "*"}
                  </FormLabel>

                  <div className="flex-[2]">
                    <FormControl className="">
                      <Input
                        className="!m-0 text-muted-foreground transition"
                        placeholder={placeholder}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="mt-1" />
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
