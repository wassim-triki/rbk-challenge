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
    ? "links-form"
    : "";
  return (
    <main className="">
      <Container>
        <div className="sm:flex-row  h-full flex flex-col-reverse gsap-2  sm:gap-5 mt-2 sm:mt-5">
          <div className="w-full hidden sm:block sm:h-full border p-4 flex-1  rounded-xl bg-white mb-2 sm:mb-0 overflow-hidden">
            <PhonePreviewContainer />
          </div>
          <div className="w-full h-fsull border psdf-4 flex-[2]  rounded-xl bg-white flex flex-col  ">
            {children}
            <div className="mt-auto flex justify-end sm:pt-5 sm:px-8 sm:pb-9 bg-resd-500 border-t p-4">
              <Button
                form={formId}
                className="ml-auto sm:w-[initial] w-full px-5"
                type="submit"
              >
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
