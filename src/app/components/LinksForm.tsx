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
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { socialLinks } from "@/lib/data";
import { Input } from "./ui/input";
import { LinkItem, useItems } from "../context";
import { Link as LinkLucid } from "lucide-react";
const getIconForPlatform = (platform: string) => {
  const socialLinkItem = socialLinks.find((item) => item.platform === platform);
  return socialLinkItem ? socialLinkItem.icon : null;
};

const LinksForm = () => {
  const { list, setList } = useItems();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(list, null, 2)}</code>
        </pre>
      ),
    });
  };

  const handleAddItem = () => {
    const newItem: LinkItem = {
      platform: "Github",
      link: "",
      initIndex: list.length,
      id: uuid(),
    };
    const updatedList = [...list, newItem];
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
        <Button onClick={handleAddItem} variant="outline" className="w-full">
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
                          <div className="rounded-lg text-muted-foreground">
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
                                        key={`select-${item.id}`}
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
                                <LinkLucid className="absolute top-0 bottom-0 w-3 h-3 my-auto left-3" />
                                <Input
                                  id={`link-${item.id}`}
                                  className="text-muted-foreground transition pl-9 pr-4"
                                  placeholder={"Enter link"}
                                  value={item.link}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    if (index >= 0 && index < newList.length) {
                                      const item = newList[index] as LinkItem;
                                      item.link = e.target.value;
                                      setList(newList);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
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
