import { NextResponse } from "next/server";
import { signToken } from "../../../../lib/auth";
import { supabaseServer } from "../../../../lib/supabase";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { email?: string; password?: string } | null;
  const email = body?.email || "";
  const password = body?.password || "";
  const secret = process.env.AUTH_SECRET || "";
  if (!secret) return NextResponse.json({ error: "Configuração ausente" }, { status: 500 });

  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data?.session) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const exp = Date.now() + 1000 * 60 * 60 * 4;
  const token = await signToken({ sub: email, exp }, secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "auth",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 4,
  });
  return res;
}
