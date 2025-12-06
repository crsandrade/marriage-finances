"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Email:", email);
    console.log("Senha:", password);

    setTimeout(() => setLoading(false), 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-sm shadow-lg border border-slate-200">
        <CardContent className="pt-6 flex flex-col gap-6">

          {/* Título */}
          <div className="flex flex-col text-center gap-1">
            <h1 className="text-2xl font-semibold">Entrar</h1>
            <p className="text-sm text-slate-500">
              Acesse sua conta para continuar
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            
            {/* E-mail */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Botão */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Rodapé */}
          <p className="text-xs text-slate-500 text-center">
            Esta é uma tela de login simples (sem autenticação real).
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
