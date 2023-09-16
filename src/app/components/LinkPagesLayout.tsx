import React from "react";
import Container from "./Container";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import PhonePreviewContainer from "./PhonePreviewContainer";

const LinkPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <Container>
        <div className="flex gap-5 mt-5">
          <div className="w-full h-ful border p-4 flex-1  rounded-xl bg-white ">
            <PhonePreviewContainer />
          </div>
          <div className="w-full h-ful border p-4 flex-[2]  rounded-xl bg-white ">
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default LinkPagesLayout;
