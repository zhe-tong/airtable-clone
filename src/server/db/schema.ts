// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  pgTable, serial, text, 
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `airtable-clone_${name}`);


//创建base表
export const bases = pgTable("bases", {
  id: text("id").primaryKey(), // 使用随机字符串作为主键
  name: varchar("name", { length: 255 }),
  created_at: text("created_at").default("now()"), // 可用 timestamp
});

export const tables = pgTable("tables", {
  id: text("id").primaryKey(), // 随机生成的字符串作为主键
  name: varchar("name", { length: 255 }).notNull(), // 形式为 "table1", "table2", ...
  baseId: text("base_id")
    .notNull()
    .references(() => bases.id), // 外键，关联到 bases 表
  created_at: timestamp("created_at").defaultNow(),
});


