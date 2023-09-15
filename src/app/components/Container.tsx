import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return <div className="mx-auto w-full max-w-7xl">{children}</div>;
};

export default Container;
