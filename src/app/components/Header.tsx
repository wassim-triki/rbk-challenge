"use client";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import Container from "./Container";
import { LinkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { usePathname } from "next/navigation";
import path from "path";
import { useUser } from "../context";

const Header = () => {
  const pathname = usePathname();
  const user = useUser();
  useEffect(() => {
    console.log(user);
  }, [user]);
  const inPreview = pathname === "/preview";
  return (
    <Container>
      <header className="bg-white border p-3 rounded-xl overflow-hidden col-span-2 ">
        <div className="flex items-center justify-between">
          {inPreview ? (
            <Button asChild size={"sm"} variant={"outline"}>
              <Link href={"/links"}>Back to Editor</Link>
            </Button>
          ) : (
            <Link href={"/"}>
              <Image
                src={"/logo-devlinks-large.svg"}
                alt="devlinks logo"
                width={10}
                height={10}
                className="w-32"
              />
            </Link>
          )}

          {!inPreview && <NavLinks />}

          <Button
            asChild
            size={"sm"}
            variant={inPreview ? "default" : "outline"}
          >
            <Link href={"/preview"}>
              {inPreview ? "Share Link" : "Preview"}
            </Link>
          </Button>
        </div>
      </header>
    </Container>
  );
};

export default Header;
