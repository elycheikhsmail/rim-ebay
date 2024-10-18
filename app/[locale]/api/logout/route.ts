import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const sessionId = cookies().get("sessionId");
  cookies().delete("sessionId");
  return NextResponse.json({ message: "Déconnexion réussie" });
}