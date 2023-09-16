import React from "react";
import Container from "./Container";

const LinkPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <Container>
        <div className="flex gap-5 mt-5">
          <div className="w-full h-ful border p-4 flex-1  rounded-xl bg-white ">
            Phone
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
