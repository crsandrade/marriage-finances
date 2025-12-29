"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) setMessage(error.message);
    else setMessage("Cadastro realizado com sucesso! Confirme seu e-mail para acessar sua conta.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md bg-card text-card-foreground shadow-xl rounded-xl p-8 border border-border">
        <h1 className="text-2xl font-bold mb-6 text-foreground text-center">Criar conta</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-60"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${message.includes("sucesso") ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
