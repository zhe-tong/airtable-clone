import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { createTable } from "~/server/db/index";

export async function POST(request: Request) {
  try {
    const { baseId } = await request.json();
    if (!baseId) {
      return NextResponse.json({ error: "Missing baseId" }, { status: 400 });
    }

    const newTable = await createTable(baseId);
    return NextResponse.json(newTable);
  } catch (error) {
    console.error("Error creating table:", error);
    return NextResponse.json({ error: "Failed to create table" }, { status: 500 });
  }
}
