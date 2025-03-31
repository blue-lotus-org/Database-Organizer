"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Requirements", href: "/requirements" },
  { name: "Conceptual Design", href: "/conceptual" },
  { name: "Logical Design", href: "/logical" },
  { name: "Normalization", href: "/normalization" },
  { name: "Denormalization", href: "/denormalization" },
  { name: "Indexing", href: "/indexing" },
  { name: "Data Integrity", href: "/integrity" },
  { name: "Security", href: "/security" },
  { name: "Scalability", href: "/scalability" },
  { name: "Performance", href: "/performance" },
  { name: "Backup & Recovery", href: "/backup" },
  { name: "Documentation", href: "/documentation" },
  { name: "Testing", href: "/testing" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col w-64 border-r h-[calc(100vh-4rem)] p-4">
      <p className="font-medium mb-3">Database Design Process</p>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

