import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { bases } from "~/server/db/schema";

export async function GET() {
  try {
    const allBases = await db.select().from(bases); // 查询数据库中所有 bases
    return NextResponse.json(allBases);
  } catch (error) {
    console.error("Failed to fetch bases:", error);
    return NextResponse.json(
      { error: "Failed to fetch bases" },
      { status: 500 }
    );
  }
}
