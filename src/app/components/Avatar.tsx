"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "../context";
import { Skeleton } from "./ui/skeleton";

const Avatar = ({ src }: { src?: string }) => {
  const defaultSrc = "/profile-picture-placeholder.png";
  const imageSrc = src || defaultSrc;

  const { profile } = useUser();
  return (
    <div className="flex mt-3 flex-col items-center">
      {profile && profile.profilePicture instanceof File ? (
        <Image
          className="w-[7vw] h-[7vw] rounded-full mb-5 border-4 border-primary object-cover "
          src={URL.createObjectURL(profile.profilePicture)}
          alt="Profile"
          width={512}
          height={512}
        />
      ) : (
        <Skeleton className="w-[7vw] h-[7vw] rounded-full bg-gray-200/70 mb-4" />
      )}

      {profile?.firstName ? (
        <h1 className="font-medium">
          {profile?.firstName} {profile?.lastName}
        </h1>
      ) : (
        <Skeleton className="w-[11vw] h-[1.3vw] rounded-full bg-gray-200/70 mb-3" />
      )}

      {profile?.email ? (
        <p className="text-xs text-gray-400">{profile?.email}</p>
      ) : (
        <Skeleton className="w-[5vw] h-[0.6vw] rounded-full bg-gray-200/70" />
      )}
    </div>
  );
};

export default Avatar;
