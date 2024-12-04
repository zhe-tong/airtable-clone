import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { tables } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const baseId = url.searchParams.get("baseId");

  if (!baseId) {
    return NextResponse.json({ error: "Base ID is required" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(tables)
    .where(eq(tables.baseId, baseId));

  return NextResponse.json(result);
}
