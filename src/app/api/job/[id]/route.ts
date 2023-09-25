import { InferApiRoute, api } from "@/lib/api";
import { AllJobsCacheTag } from "@/lib/cache-tags";
import { jobs } from "@/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import * as z from "zod";

export const GET = (req: Request, { params }: { params: { id: string } }) =>
  api
    .create(req)
    .input(undefined)
    .procedure(async ({ ctx }) => {
      const paramId = z.string().min(1).parse(params.id);

      const query = await ctx.db.query.jobs.findFirst({
        where: eq(jobs.publicId, paramId),
      });

      if (!query) {
        throw new Error(`job with the id: ${paramId} not found`);
      }
      return query;
    });

export const DELETE = (req: Request, { params }: { params: { id: string } }) =>
  api
    .create(req)
    .input(undefined)
    .procedure(async ({ ctx }) => {
      const paramId = z.string().min(1).parse(params.id);

      const query = await ctx.db.query.jobs.findFirst({
        where: eq(jobs.publicId, paramId),
      });

      if (!query) {
        throw new Error(`job with the id: ${paramId} not found`);
      }
      const deleted = await ctx.db
        .delete(jobs)
        .where(eq(jobs.publicId, paramId))
        .returning();

      revalidateTag(AllJobsCacheTag);

      return deleted;
    });

export type TJobGetOneApiRes = InferApiRoute<typeof GET>;

export type TJobDeleteOneApiRes = InferApiRoute<typeof DELETE>;
