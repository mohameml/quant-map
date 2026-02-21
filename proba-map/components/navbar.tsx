"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Roadmap", href: "/roadmap" },
  { label: "Topics", href: "/topics" },
  { label: "Exercises", href: "/exercises" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-14 border-b bg-white">
      <nav className="mx-auto flex h-full max-w-screen-2xl items-center px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
            P
          </span>
          <span className="text-lg font-bold text-gray-900">Proba-Map</span>
        </Link>

        {/* Tabs */}
        <div className="flex flex-1 items-center justify-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-green-600"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-green-600" />
                )}
              </Link>
            )
          })}
        </div>

        {/* User icon placeholder */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-gray-600">
          <User className="h-5 w-5" />
        </button>
      </nav>
    </header>
  )
}
