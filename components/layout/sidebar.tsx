"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, Warehouse, TrendingUp, Settings, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Products",
      href: "/products",
      icon: Package,
    },
    {
      label: "Warehouses",
      href: "/warehouses",
      icon: Warehouse,
    },
    {
      label: "Operations",
      href: "/operations",
      icon: TrendingUp,
      submenu: [
        { label: "Receipts", href: "/operations/receipts" },
        { label: "Deliveries", href: "/operations/deliveries" },
        { label: "Transfers", href: "/operations/transfers" },
        { label: "Adjustments", href: "/operations/adjustments" },
      ],
    },
    {
      label: "History",
      href: "/history",
      icon: TrendingUp,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn")
    sessionStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <div className={cn("flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-sidebar-primary flex items-center justify-center">
            <svg className="h-5 w-5 text-sidebar-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <span className="font-bold text-sidebar-foreground">StockMaster</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
              {item.submenu && isActive && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded text-xs font-medium transition-colors",
                        pathname === subitem.href
                          ? "text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                      )}
                    >
                      <ChevronRight className="h-3 w-3" />
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="px-4 py-2 text-xs">
          <p className="font-medium text-sidebar-foreground">Logged in as</p>
          <p className="text-sidebar-foreground/70 truncate">manager@stockmaster.com</p>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-center bg-transparent" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
