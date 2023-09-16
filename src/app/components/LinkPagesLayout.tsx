import React from "react";
import Container from "./Container";
import Image from "next/image";

const LinkPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <Container>
        <div className="flex gap-5 mt-5">
          <div className="w-full h-ful border p-4 flex-1  rounded-xl bg-white ">
            <div className="bg-red-50s0 m-16">
              <Image
                className="w-full object-cover"
                src={"/iphone.png"}
                alt="iphone"
                width={1080}
                height={1080}
                quality={100}
              />
            </div>
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
