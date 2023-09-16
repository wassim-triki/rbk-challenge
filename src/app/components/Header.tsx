"use client";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { LinkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { usePathname } from "next/navigation";
import path from "path";
import { AppContext, useUser } from "../context";
import App from "next/app";

const Header = () => {
  const pathname = usePathname();
  const user = useUser();

  const [open, setOpen] = useState(false);

  const state = useContext(AppContext);
  useEffect(() => {
    console.log(state);
  }, [state]);
  const inPreview = pathname === "/preview";
  return (
    <Container>
      <header className="bg-white borsder p-3 rounded-xl overflow-hidden col-span-2 z-[999] relative">
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

          <div className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-3xl backdrop-blur-md py-32 p-4">
            <Button
              asChild
              className="flex bg-transparent w-full"
              size={"sm"}
              variant={"ghost"}
            >
              <Link href={"/links"}>Links</Link>
            </Button>
            <Button
              asChild
              className="flex bg-transparent w-full"
              size={"sm"}
              variant={"ghost"}
            >
              <Link href={"/profile"}>Profile Details</Link>
            </Button>
            <Button
              asChild
              className="flex bg-transparent w-full"
              size={"sm"}
              variant={inPreview ? "default" : "outline"}
            >
              <Link href={"/preview"}>
                {inPreview ? "Share Link" : "Preview"}
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex my-auto flex-col justify-center items-center sm:hidden mr-1"
          >
            <span
              className={`transition bg-black block h-0.5 w-6 rounded-sm ${
                open ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`transition bg-black block h-0.5 w-6 my-0.5 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`transition bg-black block h-0.5 w-6 rounded-sm ${
                open ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
            ></span>
          </button>

          <Button
            asChild
            className="hidden sm:flex"
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
