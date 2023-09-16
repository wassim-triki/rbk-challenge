"use client";
import React, { useState } from "react";
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
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { socialLinks } from "@/lib/data";
import { Input } from "./ui/input";
import { useItems } from "../context";

export enum SocialPlatforms {
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

  const { register, control, handleSubmit, watch, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  console.log("fields:", fields);
  // const { setList, list } = useItems();

  const onSubmit = (data: any) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // setList(data.links);
  };

  const getIconForPlatform = (platform: string) => {
    const socialLinkItem = socialLinks.find(
      (item) => item.platform === platform
    );
    return socialLinkItem ? socialLinkItem.icon : null;
  };
  const handleAddItem = () => {
    append({ platform: SocialPlatforms.Github, link: "" });
  };
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const [localFields, setLocalFields] = useState(fields);
  const handleDragDrop = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const updatedLinks = reorder(localFields, source.index, destination.index);
    setLocalFields(updatedLinks); // Force an update with React's setState
    console.log("Updated Local Fields:", localFields);
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className="bg-red-500">
        <Button onClick={handleAddItem} variant="outline" className="w-full">
          + Add new link
        </Button>
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            id="links-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-5"
                >
                  {fields.map((field, index) => (
                    <Draggable
                      draggableId={field.id}
                      key={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          key={field.id}
                          className="flex flex-col gap-0 rounded-lg bg-gray-100 p-4 pt-0 first:mt-5"
                        >
                          <div className="rounded-lg text-muted-foreground">
                            <div className="draggable  flex justify-between">
                              <Button
                                type="button"
                                className="flex text-xs font-bold p-0 items-center gap-1"
                                variant="ghost"
                              >
                                <Bars2Icon className="w-4 h-4" />
                                Link #{index + 1}
                              </Button>

                              <Button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-xs p-0"
                                variant="ghost"
                              >
                                Remove
                              </Button>
                            </div>
                            <FormField
                              control={control}
                              name={`links[${index}].platform`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex-1 text-muted-foreground font-normal text-xs">
                                    Platfrom
                                  </FormLabel>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger>
                                      {field.value ? (
                                        <div className="flex items-center gap-2">
                                          {React.createElement(
                                            getIconForPlatform(field.value),
                                            {
                                              className: "w-4 h-4",
                                            }
                                          )}
                                          {field.value}
                                        </div>
                                      ) : (
                                        "Select platform"
                                      )}
                                    </SelectTrigger>
                                    <SelectContent>
                                      {socialLinks.map(
                                        ({ platform, icon: Icon }) => (
                                          <SelectItem
                                            className="flex gap-1"
                                            key={platform}
                                            value={platform}
                                            onSelect={() =>
                                              field.onChange(platform)
                                            }
                                          >
                                            <Icon className="w-4 h-4" />
                                            {platform}
                                          </SelectItem>
                                        )
                                      )}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={control}
                              name={`links[${index}].link`}
                              render={({ field }) => (
                                <FormItem className="mt-1">
                                  <FormLabel className="flex-1 text-muted-foreground font-normal text-xs">
                                    Link
                                  </FormLabel>
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
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </form>
        </Form>
      </div>
    </DragDropContext>
  );
};

export default LinksForm;
