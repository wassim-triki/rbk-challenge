import React from "react";
import LinkPagesLayout from "../components/LinkPagesLayout";
import ProfileForm from "../components/ProfileForm";
import SectionLayout from "../components/SectionLayout";

const page = () => {
  return (
    <LinkPagesLayout>
      <SectionLayout
        title="Profile Details"
        description="Add your details to create a personal touch to your profile."
      >
        <ProfileForm />
      </SectionLayout>
    </LinkPagesLayout>
  );
};

export default page;
