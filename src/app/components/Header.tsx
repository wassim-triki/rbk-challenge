import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import React from "react";
import Container from "./Container";
import { LinkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import NavLinks from "./NavLinks";
import Image from "next/image";

const Header = () => {
  return (
    <Container>
      <header className="bg-white border p-3 rounded-xl overflow-hidden col-span-2 ">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={"/logo-devlinks-large.svg"}
              alt="devlinks logo"
              width={10}
              height={10}
              className="w-32"
            />
          </Link>
          <NavLinks />

          <Button size={"sm"} variant={"outline"}>
            Preview
          </Button>
        </div>
      </header>
    </Container>
  );
};

export default Header;
