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
import { z } from "zod";
import { toast } from "./ui/use-toast";
import { Bars2Icon } from "@heroicons/react/24/outline";
import uuid from "react-uuid";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { socialLinks } from "@/lib/data";
import { Input } from "./ui/input";
import { LinkItem, useItems } from "../context";
import { Link as LinkLucid } from "lucide-react";

const linkSchema = z.object({
  platform: z.string(),
  link: z
    .string()
    .url("Please add valid link.")
    .nonempty("Link cannot be empty."),
});

const getIconForPlatform = (platform: string) => {
  const socialLinkItem = socialLinks.find((item) => item.platform === platform);
  return socialLinkItem ? socialLinkItem.icon : null;
};

const LinksForm = () => {
  const { list, setList, setSavedList, savedList } = useItems();
  type Errors = { [key: string]: string[] };
  const [linkErrors, setLinkErrors] = useState<Errors>({});

  const validateLinks = (): Errors => {
    const newErrors: Errors = {};

    list.forEach((item) => {
      try {
        linkSchema.parse(item);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors[item.id] = error.issues.map((issue) => issue.message);
        }
      }
    });
    return newErrors;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLinks();
    setLinkErrors(validationErrors); // This will update the state for UI feedback

    if (Object.keys(validationErrors).length === 0) {
      setSavedList(JSON.parse(JSON.stringify(list)));

      toast({
        description: (
          <div className="w-[340px] rounded-lg">
            <p>Your changes have been successfully saved!</p>
          </div>
        ),
      });
    } else {
      // Handle or display validation errors accordingly
    }
  };
  const fadeIn = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAddItem = () => {
    const newItem: LinkItem = {
      platform: "Github",
      link: "",
      initIndex: list.length,
      id: uuid(),
    };
    const updatedList = [newItem, ...list];
    setList(updatedList);
  };

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragDrop = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;
    console.log(result);

    const updatedLinks = reorder(list, source.index, destination.index);
    setList(updatedLinks);
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className="flex flex-col gap-5">
        <Button
          disabled={list.length >= 5 || savedList.length >= 5}
          onClick={handleAddItem}
          variant="outline"
          className="w-full"
        >
          + Add new link
        </Button>
        <form onSubmit={onSubmit} id="links-form">
          <div className="flex flex-col gap-5">
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-5"
                >
                  {list.map((item, index) => (
                    <Draggable
                      key={`key-${item.id}`}
                      draggableId={`draggable-${item.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          className="flex flex-col gap-0 rounded-lg bg-gray-100 p-4 pt-0 "
                        >
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="rounded-lg text-muted-foreground"
                          >
                            <div className="draggable flex justify-between mb-1">
                              <Button
                                type="button"
                                className="flex text-sm font-bold p-0 items-center gap-1"
                                variant="ghost"
                              >
                                <Bars2Icon className="w-4 h-4" />
                                Link #{item.initIndex + 1}
                              </Button>
                              <Button
                                type="button"
                                onClick={() => {
                                  const newList = [...list];
                                  newList.splice(index, 1);
                                  setList(newList);
                                }}
                                className="text-sm p-0"
                                variant="ghost"
                              >
                                Remove
                              </Button>
                            </div>

                            <div className="flex flex-col gap-3">
                              <label
                                className="mb-[-8px] text-xs"
                                htmlFor={`select-trigger-${item.id}`}
                              >
                                Platform
                              </label>
                              <Select
                                value={item.platform}
                                onValueChange={(value) => {
                                  const newList = [...list];
                                  if (index >= 0 && index < newList.length) {
                                    const item = newList[index] as LinkItem;
                                    item.platform = value;
                                    setList(newList);
                                  }
                                }}
                              >
                                <SelectTrigger id={`select-trigger-${item.id}`}>
                                  {item.platform ? (
                                    <div className="flex items-center gap-2">
                                      {React.createElement(
                                        getIconForPlatform(item.platform),
                                        { className: "w-4 h-4" }
                                      )}
                                      {item.platform}
                                    </div>
                                  ) : (
                                    "Select platform"
                                  )}
                                </SelectTrigger>
                                <SelectContent>
                                  {socialLinks.map(
                                    ({ platform, icon: Icon }) => (
                                      <SelectItem
                                        key={`select-${item.id}-${platform}}`}
                                        value={platform}
                                      >
                                        <Icon className="w-4 h-4" />
                                        {platform}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>

                              <label
                                className="mb-[-8px] text-xs"
                                htmlFor={`link-${item.id}`}
                              >
                                Link
                              </label>
                              <div className="relative">
                                <LinkLucid className="absolute top-0 bottom-0 w-3 h-full my-auto left-3" />
                                <Input
                                  id={`link-${item.id}`}
                                  className="text-muted-foreground transition pl-9 pr-4 m"
                                  placeholder={`Add link to ${item.platform}`}
                                  value={item.link}
                                  onChange={(e) => {
                                    validateLinks();
                                    const newList = [...list];
                                    if (index >= 0 && index < newList.length) {
                                      const item = newList[index] as LinkItem;
                                      item.link = e.target.value;
                                      setList(newList);
                                    }
                                  }}
                                ></Input>
                              </div>
                              {linkErrors[item.id]?.map((error) => (
                                <p
                                  key={`error-${item.id}-${error}`}
                                  className="text-red-500 font-medium text-xs"
                                >
                                  {error}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </form>
      </div>
    </DragDropContext>
  );
};

export default LinksForm;
