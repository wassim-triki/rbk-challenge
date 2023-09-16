"use client";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { useItems, useUser } from "../context";
import { linkPreviews, socialIcons } from "@/lib/data";
import { ArrowRight } from "lucide-react";
const PhonePreviewContainer = () => {
  const { profile, setProfile } = useUser();
  const { list } = useItems();
  return (
    <div className=" m-16 relative">
      <Image
        className="w-full object-cover"
        src={"/iphone.png"}
        alt="iphone"
        width={1080}
        height={1080}
        quality={100}
      />
      <div className="bg-rsed-500/50 absolute inset-0 w-full h-full p-10 flex flex-col gap-[3.25rem]">
        <div className="flex mt-3 flex-col items-center">
          {profile && profile.profilePicture instanceof File ? (
            <Image
              className="w-[83px] h-[83px] rounded-full mb-5 border-4 border-primary object-cover "
              src={URL.createObjectURL(profile.profilePicture)}
              alt="Profile"
              width={512}
              height={512}
            />
          ) : (
            <Skeleton className="w-[83px] h-[83px] rounded-full bg-gray-200/70 mb-5" />
          )}

          {profile?.firstName ? (
            <h1 className="font-medium">
              {profile?.firstName} {profile?.lastName}
            </h1>
          ) : (
            <Skeleton className="w-[125px] h-[16px] rounded-full bg-gray-200/70 mb-3" />
          )}

          {profile?.email ? (
            <p className="text-xs text-gray-400">{profile?.email}</p>
          ) : (
            <Skeleton className="w-[75px] h-[11px] rounded-full bg-gray-200/70" />
          )}
        </div>
        <div className="flex flex-col gap-4">
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

export default PhonePreviewContainer;
