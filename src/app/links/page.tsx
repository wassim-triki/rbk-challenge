import React from "react";
import LinkPagesLayout from "../components/LinkPagesLayout";
import SectionLayout from "../components/SectionLayout";
import LinksForm from "../components/LinksForm";

const page = () => {
  return (
    <LinkPagesLayout>
      <SectionLayout
        title="Customize your links"
        description="Add/edit/remove links below and then share all your profiles with the world!"
      >
        <LinksForm />
      </SectionLayout>
    </LinkPagesLayout>
  );
};

export default page;
