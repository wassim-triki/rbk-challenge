import React from "react";
import { Button } from "./ui/button";
type SectionLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};
const SectionLayout = ({
  title,
  description,
  children,
}: SectionLayoutProps) => {
  return (
    <div className="p-8 flex flex-col gap-8 ">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-3xl">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {children}
    </div>
  );
};

export default SectionLayout;
