import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Container from "./Container";

const Header = () => {
  return (
    <header className="bg-white border p-4 rounded-xl overflow-hidden col-span-2 ">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-2xl">devlinks</span>
          </div>

          <nav className="flex gap-4">
            <Button size={"sm"} asChild variant={"ghost"}>
              <Link href={"#"}>Links</Link>
            </Button>
            <Button size={"sm"} asChild>
              <Link href={"#"}>Profile Details</Link>
            </Button>
          </nav>
          <Button size={"sm"} variant={"outline"}>
            Preview
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
