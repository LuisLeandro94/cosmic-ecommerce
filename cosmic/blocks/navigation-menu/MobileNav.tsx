"use client"

import { cn } from "@/cosmic/utils"
import Link from "next/link"
import React from "react"

import ThemeToggleSwitch from "@/components/ThemeToggleSwitch"
import { MenuIcon, XIcon } from "lucide-react"
import { CheckOut } from "../ecommerce/CheckOut"
import { ItemType } from "./NavMenu"

export function MobileNav({
  items,
  className,
}: {
  items: ItemType[]
  className?: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className={cn("relative md:hidden", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-6 w-6 cursor-pointer"
      >
        {isOpen ? (
          <XIcon className="text-neutral-900 dark:neutral-300" />
        ) : (
          <MenuIcon className="text-neutral-900 dark:text-neutral-300" />
        )}
      </button>
      {isOpen && (
        <div className="absolute -right-3 top-full z-[9999] mt-2 w-[90svw] rounded-xl dark:bg-neutral-300 p-4 shadow-lg bg-neutral-900">
          <div>
            {items.map((item: ItemType) => {
              return (
                <Link
                  href={item.link}
                  key={item.title}
                  onClick={() => setIsOpen(!isOpen)}
                  target={item.open_in_new_tab ? "_blank" : ""}
                  className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:text-neutral-900 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-900 dark:data-[state=open]:bg-zinc-900 md:w-max"
                >
                  {item.title}
                </Link>
              )
            })}
            <div className="ml-4 flex text-center justify-center text-neutral-300 dark:text-neutral-900">
              <ThemeToggleSwitch />
              <CheckOut productPath={"/shop"} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
