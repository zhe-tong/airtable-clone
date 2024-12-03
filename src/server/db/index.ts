import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { nanoid } from "nanoid";
import * as schema from "./schema";

const sql = neon(process.env.POSTGRES_URL!);

export const db = drizzle(sql, {schema});


export async function createBase(name: string = "Untitled Base") {
  const id = nanoid(10); // 生成 10 字符长度的随机标识符

  try {
    const newBase = await db
      .insert(schema.bases)
      .values({ id, name }) // 插入随机 id 和 name
      .returning();
    return newBase[0];
  } catch (error) {
    console.error("Failed to create base:", error);
    throw new Error("Failed to create base");
  }
}
