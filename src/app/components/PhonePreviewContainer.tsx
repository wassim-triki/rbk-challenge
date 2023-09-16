"use client";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "../context";

const PhonePreviewContainer = () => {
  const { profile, setProfile } = useUser();
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
          <div className="w-full h-10 bg-gray-200/70 rounded-lg "></div>
          <div className="w-full h-10 bg-gray-200/70 rounded-lg "></div>
          <div className="w-full h-10 bg-gray-200/70 rounded-lg "></div>
          <div className="w-full h-10 bg-gray-200/70 rounded-lg "></div>
          <div className="w-full h-10 bg-gray-200/70 rounded-lg "></div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreviewContainer;
