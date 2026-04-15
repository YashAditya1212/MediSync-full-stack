"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { deleteCookie } from "cookies-next";

type Props = {};

export default function UserNav({}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none select-none">
        <Avatar className="select-none">
          <AvatarImage src="hello.png" alt="@Yash" />
          <AvatarFallback>EG</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Admin</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/"}>Homepage</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/dashboard"}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            deleteCookie("token");
            window.location.pathname = "/auth/login";
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
