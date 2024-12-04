import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { tables } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tableId = url.searchParams.get("tableId");

    

    if (!tableId) {
      return NextResponse.json({ error: "Table ID is required" }, { status: 400 });
    }

    const result = await db.select().from(tables).where(eq(tables.id, tableId));

    console.log("Requested Table ID:", tableId);
    console.log("Query Result:", result);


    if (result.length === 0) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]); // 返回查询结果
  } catch (error) {
    console.error("Error fetching table:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
