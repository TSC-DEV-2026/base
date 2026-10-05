import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resendVerification } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

export function HomePage() {
  const user = useAuthStore((state) => state.user)
  const activeTenant = useAuthStore((state) => state.activeTenant)
  const [email, setEmail] = useState(user?.email || "")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError("")
    setMessage("")
    try {
      const result = await resendVerification(email.trim())
      setMessage(result.message)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível reenviar.")
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Sessão</h1>
        <p className="mt-2 text-sm">Olá, {user?.full_name}.</p>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
        <p className="text-sm text-muted-foreground">Empresa: {activeTenant?.name}</p>
        <p className="text-sm text-muted-foreground">Papel: {user?.role}</p>
        <p className="text-sm text-muted-foreground">
          E-mail {user?.email_verified ? "confirmado" : "ainda não confirmado"}. O acesso não depende dessa confirmação.
        </p>
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Label htmlFor="email">Reenviar verificação</Label>
        <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        {message ? <p className="text-sm">{message}</p> : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" variant="outline">Reenviar</Button>
      </form>
    </div>
  )
}
