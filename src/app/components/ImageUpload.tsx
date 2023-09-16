"use client";
import React, { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";

const ImageUpload = (props: any) => {
  const { register, unregister, setValue, watch } = useFormContext();

  const { name, label = name, accept } = props;

  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles: any) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept,
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <>
      <label
        htmlFor="name"
        className="mb-2 block text-sm font-bold capitalize text-gray-700"
      >
        {label}
      </label>

      <div {...getRootProps()} className="mb-8">
        <input
          {...props}
          className="focus:shadow-lg w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id={name}
          {...getInputProps()}
        />
        <div
          className={`w-full border border-dashed border-gray-900 p-2 ${
            isDragActive ? "bg-gray-400" : "bg-gray-200"
          }`}
        >
          {isDragActive ? (
            <p className="my-2 text-center">Drop the files here...</p>
          ) : (
            <p className="my-2 text-center">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
          {/* display Preview */}
          {!!files?.length && (
            <div className="mt-2 grid grid-cols-1 gap-1">
              {files.map((file: Blob) => (
                <div key={file.name}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="profile picture"
                    className="w-full"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
