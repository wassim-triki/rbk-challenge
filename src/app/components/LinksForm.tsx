"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { useFieldArray } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { socialLinks } from "@/lib/data";
import { Input } from "./ui/input";

enum SocialPlatforms {
  Github = "Github",
  Youtube = "Youtube",
  LinkedIn = "LinkedIn",
}

const ItemSchema = z.object({
  platform: z
    .nativeEnum(SocialPlatforms)
    .refine((value) => Object.values(SocialPlatforms).includes(value), {
      message: "Please select a platform",
    }),
  link: z
    .string()
    .nonempty("Please add a link")
    .refine(
      (link) => link.startsWith("http://") || link.startsWith("https://"),
      {
        message: "Please enter a valid link starting with http:// or https://",
      }
    ),
});

const FormSchema = z.object({
  links: z.array(ItemSchema),
});

const LinksForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const { register, control, handleSubmit, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = (data: any) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const handleAddItem = () => {
    append({ platform: SocialPlatforms.Github, link: "" });
  };

  return (
    <div>
      <Button onClick={handleAddItem} variant="outline" className="w-full">
        + Add new link
      </Button>

      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          id="links-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col gap-0 rounded-lg bg-gray-100 p-4 pt-0 first:mt-5"
            >
              <div className="rounded-lg text-muted-foreground">
                <div className="draggable text-sm flex justify-between">
                  <Button
                    type="button"
                    className="flex p-0 items-center gap-1"
                    variant="ghost"
                  >
                    <Bars2Icon className="w-4 h-4" />
                    Link #{index + 1}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="font-light p-0"
                    variant="ghost"
                  >
                    Remove
                  </Button>
                </div>
                <Controller
                  control={control}
                  name={`links[${index}].platform`}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        {field.value || "Select platform"}
                      </SelectTrigger>
                      <SelectContent>
                        {socialLinks.map(({ platform, icon: Icon }) => (
                          <SelectItem
                            className="flex gap-1"
                            key={platform}
                            value={platform}
                            onSelect={() => field.onChange(platform)}
                          >
                            <Icon className="w-4 h-4" />
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <FormField
                  control={control}
                  name={`links[${index}].link`}
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div className="flex-[2] mt-4">
                        <FormControl className="">
                          <Input
                            className="text-muted-foreground transition"
                            placeholder={"Enter link"}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </form>
      </Form>
    </div>
  );
};

export default LinksForm;
