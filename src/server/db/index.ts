import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { nanoid } from "nanoid";
import * as schema from "./schema";
import { tables } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.POSTGRES_URL!);

export const db = drizzle(sql, {schema});


export async function createBase(name: string = "Untitled Base") {
  const id = nanoid(10);

  try {
    const newBase = await db
      .insert(schema.bases)
      .values({ id, name })
      .returning();
    return newBase[0];
  } catch (error) {
    console.error("Failed to create base:", error);
    throw new Error("Failed to create base");
  }
}

export async function createTable(baseId: string) {
  try {
    // 生成随机字符串 ID
    const id = nanoid(10);

    // 查询 base 下的最大 table 数字
    const tablesList = await db
      .select({ name: tables.name })
      .from(tables)
      .where(eq(tables.baseId, baseId));

    // 处理空表的情况，确保 maxNumber 为 0
    const maxNumber = tablesList.length > 0
      ? tablesList
          .map((table) => parseInt(table.name.replace("table", ""), 10))
          .filter((num) => !isNaN(num))
          .reduce((max, num) => Math.max(max, num), 0)
      : 0;

    const nextNumber = maxNumber + 1;

    // 插入新 table
    const [newTable] = await db
      .insert(tables)
      .values({
        id,
        baseId,
        name: `table${nextNumber}`, // 生成 "table1", "table2" 等
      })
      .returning();

    return newTable;
  } catch (error) {
    console.error("Failed to create table:", error);
    throw new Error("Failed to create table");
  }
}

