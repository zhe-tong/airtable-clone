import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "./schema";

const sql = neon(process.env.POSTGRES_URL!);

export const db = drizzle(sql, {schema});

export async function createBase(name: string = "Untitled Base") {
    try {
      const newBase = await db
        .insert(schema.bases) // 使用 bases 表的 Schema
        .values({ name }) // 插入数据
        .returning(); // 返回插入的数据
      return newBase[0]; // 返回第一条结果
    } catch (error) {
      console.error("Failed to create base:", error);
      throw new Error("Failed to create base");
    }
  }