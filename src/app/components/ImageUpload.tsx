"use client";
import React, { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { FormMessage } from "./ui/form";
import { useUser } from "../context";
const ImageUpload = (props: any) => {
  const { register, unregister, setValue, watch } = useFormContext();
  const { name, label, accept } = props;
  const { profile } = useUser();
  const files = watch(name);
  const onDrop = useCallback(
    (droppedFiles: any) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    maxSize: 1024 * 1024,
    onDrop,
    accept,
    multiple: false,
  });
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  return (
    <>
      <div {...getRootProps()}>
        <input
          {...props}
          className="focus:shadow-lg w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id={name}
          multiple={false}
          {...getInputProps()}
        />
        <div
          className={`w-full text-muted-foreground sm:items-center flex gap-1 justify-between rounded-lg bg-muted p-4 ${
            isDragActive ? "bg-gray-400" : "bg-gray-200"
          }`}
        >
          <div className="sm:flex-1">
            <label
              htmlFor={name}
              className="flex-1 text-sm text-muted-foreground font-normal"
            >
              {label}
            </label>
            <div className="text-xs sm:hidden mt-6">
              <p>Image must be below 1024x1024px.</p>
              <p>Use PNG, JPG, or BMP format.</p>
            </div>
          </div>
          <div className="flex  justify-between gap-5 sm:flex-[2] ">
            <div className="rounded-lg overflow-hidden w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] relative flex-shrink-0">
              <Image
                src={
                  !!files?.length
                    ? URL.createObjectURL(files[0])
                    : profile && profile.profilePicture instanceof File
                    ? URL.createObjectURL(profile.profilePicture)
                    : "/profile-picture-placeholder.png"
                }
                alt="profile picture"
                className="w-full rounded-lg h-full object-cover"
                width={100}
                height={100}
                quality={95}
              />
              <div className="w-[150px]  sm:w-[170px] sm:h-[170px] rounded-lg h-[150px] absolute inset-0 bg-black/50 text-white flex justify-center flex-col items-center p-5">
                {isDragActive ? (
                  <>
                    <ArrowDownToLine className="w-8 h-8" />
                    <p className="text-center text-sm">Drop image here...</p>
                  </>
                ) : (
                  <>
                    <PhotoIcon className="w-8 h-8" />
                    <p className="hidden sm:block text-center text-sm">
                      Click or drag &apos;n&apos; drop to select image
                    </p>
                    <p className="block sm:hidden text-center text-sm">
                      Select image from gallery
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className=" mx-auto text-xs hidden sm:flex justify-center flex-col">
              <p>Image must be below 1024x1024px.</p>
              <p>Use PNG, JPG, or BMP format.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ImageUpload;
