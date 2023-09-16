"use client";
import React from "react";
import { useItems, useUser } from "../context";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import { linkPreviews } from "@/lib/data";
import { ArrowRight } from "lucide-react";
const page = () => {
  const { profile, setProfile } = useUser();
  const { list } = useItems();
  return (
    <div className="h-screen w-full ">
      <div className="absolute top-0 left-0 bg-primary h-1/3 w-full -z-20 rounded-b-3xl shadow-md"></div>

      <div className="bg-white absolute top-1/2 left-1/2 -translate-y-[41%] -translate-x-1/2 shadow-lg rounded-3xl p-10 w-11/12 flex flex-col items-center gap-10">
        <Avatar
          src={
            profile?.profilePicture
              ? URL.createObjectURL(profile.profilePicture)
              : undefined
          }
        />
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 5 }).map((_, index) => {
            const item = list[index];
            const platform =
              item?.platform.toLowerCase() as keyof typeof linkPreviews;
            const preview = linkPreviews[platform];

            if (item && preview) {
              const IconComponent = preview.icon;

              return (
                <div
                  style={{ backgroundColor: preview.bg }}
                  className={`w-full h-10 rounded-lg flex items-center text-white px-3 py-2 gap-2`}
                  key={index}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{item.platform}</span>
                  <ArrowRight className="ml-auto w-4 h-4" />
                </div>
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

export default page;
