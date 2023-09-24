import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { TLevel, TType, jobModelFields } from "../zod-schemas/job";
import { generatePublicId } from "../lib/nano-id";
import { sql } from "drizzle-orm";

export const jobs = sqliteTable("job", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  publicId: text("public_id").default(generatePublicId()).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").$type<TType>().notNull(),
  level: text("level").$type<TLevel>().notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

export const selectJobSchema = createSelectSchema(jobs, jobModelFields);
