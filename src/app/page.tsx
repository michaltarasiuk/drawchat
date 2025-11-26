"use client";

import "@excalidraw/excalidraw/index.css";

import dynamic from "next/dynamic";

import {Chat} from "@/components/Chat";
import {cn} from "@/lib/cn";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

export default function RootPage() {
  return (
    <div className={cn("flex min-h-dvh")}>
      <div className={cn("flex-2")}>
        <Excalidraw />
      </div>
      <div className={cn("hidden", "lg:flex-1 xl:block")}>
        <Chat />
      </div>
    </div>
  );
}
