"use client";
import React from "react";
import Container from "./Container";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import PhonePreviewContainer from "./PhonePreviewContainer";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const LinkPagesLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const formId = pathname.includes("profile")
    ? "profile-form"
    : pathname.includes("link")
    ? "link-form"
    : "";
  return (
    <main className="">
      <Container>
        <div className="flex gap-5 mt-5">
          <div className="w-full h-ful border p-4 flex-1  rounded-xl bg-white ">
            <PhonePreviewContainer />
          </div>
          <div className="w-full h-ful border psdf-4 flex-[2]  rounded-xl bg-white ">
            {children}
            <div className="flex justify-end pt-5 px-8 pb-9 bg-resd-500 border-t">
              <Button form={formId} className="ml-auto px-5" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default LinkPagesLayout;
