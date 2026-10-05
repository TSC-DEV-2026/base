import { Building2, KeyRound, LayoutDashboard, LogOut, Users } from "lucide-react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

import { TenantSwitcher } from "@/components/layouts/TenantSwitcher"
import { Button } from "@/components/ui/button"
import { logout } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"
import { cn } from "@/utils/cn"

const items = [
  { to: "/", label: "Início", icon: LayoutDashboard },
  { to: "/memberships", label: "Pessoas", icon: Users },
  { to: "/tenants", label: "Empresas", icon: Building2 },
]

export function AppShell() {
  const user = useAuthStore((state) => state.user)
  const location = useLocation()
  const navigate = useNavigate()

  async function sair() {
    try {
      await logout()
    } finally {
      useAuthStore.getState().clear()
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="flex flex-col border-b border-border bg-card md:min-h-screen md:border-b-0 md:border-r">
        <div className="px-4 py-4">
          <p className="text-sm font-semibold">Base</p>
          <p className="truncate text-xs text-muted-foreground">{user?.full_name}</p>
        </div>
        <nav className="flex gap-1 px-2 md:flex-col">
          {items.map((item) => {
            const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                  active && "bg-muted font-medium",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto space-y-3 p-4">
          <TenantSwitcher />
          <Link to="/change-password" className="inline-flex items-center gap-2 text-sm">
            <KeyRound className="h-4 w-4" />
            Senha
          </Link>
          <Button type="button" variant="ghost" size="sm" onClick={() => void sair()}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>
      <main className="px-4 py-6 md:px-8">
        <Outlet />
      </main>
    </div>
  )
}
