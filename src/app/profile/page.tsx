import React from "react";
import LinkPagesLayout from "../components/LinkPagesLayout";

const page = () => {
  return (
    <LinkPagesLayout>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-3xl">Profile Details</h2>
          <p className="text-sm text-muted-foreground">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
      </div>
    </LinkPagesLayout>
  );
};

export default page;
