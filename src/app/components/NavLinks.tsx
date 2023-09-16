"use client";
import React, { useEffect } from "react";
import { UserCircle2, Link as LinkLucid } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import path from "path";
const NavLinks = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const links = [
    {
      name: "Links",
      icon: <LinkLucid className="w-4 h-4" />,
      href: "/links",
    },
    {
      name: "Profile Details",
      icon: <UserCircle2 className="w-4 h-4" />,
      href: "/profile",
    },
  ];
  return (
    <nav className="flex gap-4">
      {links.map((link) => (
        <Button
          key={link.href}
          size={"sm"}
          asChild
          variant={pathname === link.href ? "secondary" : "ghost"}
          className={`${
            pathname === link.href
              ? "text-muted-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Link className="gap-2" href={link.href}>
            {link.icon}
            {link.name}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

export default NavLinks;
