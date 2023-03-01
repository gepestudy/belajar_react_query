import { AppShell, Header } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { ToggleColorScheme } from "../button/ToggleColorScheme";

const MyAppshell = ({ children }: { children: JSX.Element }) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header
          height={60}
          p="xs"
          className="items-center flex justify-between"
        >
          {/* Header content */}
          <div>
            <Link href="/">
              <p className="text-2xl font-bold">GEPE</p>
            </Link>
          </div>
          <div>
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-lg font-semibold">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-lg font-semibold">
                  Post
                </Link>
              </li>
              <li>
                <Link href="#" className="text-lg font-semibold">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ToggleColorScheme />
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default MyAppshell;
