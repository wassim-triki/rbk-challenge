"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { useItems, useUser } from "../context";
import { linkPreviews, socialIcons } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Avatar from "./Avatar";
import Link from "next/link";
const PhonePreviewContainer = () => {
  const { profile, setProfile } = useUser();
  const { list, savedList } = useItems();
  useEffect(() => {
    console.log("editr:", list);
    console.log("saved:", savedList);
  }, [list, savedList]);
  return (
    <div className=" sm:m-16 m-0 relative">
      <Image
        className="w-2/5 sm:w-full object-cover mx-auto"
        src={"/iphone.png"}
        alt="iphone"
        width={1080}
        height={1080}
        quality={100}
      />
      <div className="bg-resd-500/50 absolute inset-0 w-2/5 sm:w-full h-full sm:p-10 p-0 flex flex-col gap-[3.25rem] mx-auto">
        <Avatar />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => {
            const item = savedList[index];
            const platform =
              item?.platform.toLowerCase() as keyof typeof linkPreviews;
            const preview = linkPreviews[platform];

            if (item && preview) {
              const IconComponent = preview.icon;

              return (
                <a
                  href={item.link}
                  style={{ backgroundColor: preview.bg }}
                  className={`w-full h-10 rounded-lg flex items-center text-white px-3 py-2 gap-2`}
                  key={index}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{item.platform}</span>
                  <ArrowRight className="ml-auto w-4 h-4" />
                </a>
              );
            } else {
              return (
                <div
                  className="w-full h-10 bg-gray-200/70 rounded-lg"
                  key={index}
                ></div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PhonePreviewContainer;
