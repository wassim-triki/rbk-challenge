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
import { motion, Variants } from "framer-motion";
const Header = () => {
  const pathname = usePathname();
  const user = useUser();

  const [open, setOpen] = useState(false);

  const fadeInOutVariants: Variants = {
    open: {
      // opacity: 1,
      y: 0,
      x: "-50%",
    },
    closed: {
      // opacity: 0,
      y: -250,
      x: "-50%",
    },
  };

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

          <motion.div
            className="min-w-[70vw] w-[95%] flex flex-col justify-between shadow-sm z-30 items-center fixed top-[77px] left-1/2 -translate-x-1/2  bg-gray-100/80 rounded-xl backdrop-blur-md p-4 sm:hidden"
            initial="closed"
            animate={open ? "open" : "closed"}
            variants={fadeInOutVariants}
            transition={{ type: "spring", bounce: 0.5, duration: 0.75 }}
          >
            <Button
              asChild
              className="flex bg-transparent w-full"
              size={"sm"}
              variant={pathname === "/links" ? "outline" : "ghost"}
              onClick={() => setOpen(false)}
            >
              <Link href={"/links"}>Links</Link>
            </Button>
            <Button
              asChild
              className="flex bg-transparent w-full"
              size={"sm"}
              variant={pathname === "/profile" ? "outline" : "ghost"}
              onClick={() => setOpen(false)}
            >
              <Link href={"/profile"}>Profile Details</Link>
            </Button>
            <Button
              asChild
              className="flex bg-transparent w-full"
              size={"sm"}
              variant={pathname === "/preview" ? "outline" : "ghost"}
              onClick={() => setOpen(false)}
            >
              <Link href={"/preview"}>
                {inPreview ? "Share Link" : "Preview"}
              </Link>
            </Button>
          </motion.div>

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
