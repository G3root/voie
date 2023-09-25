import { InferApiRoute, api } from "@/lib/api";
import { AllJobsCacheTag, JobDetailCacheTag } from "@/lib/cache-tags";
import { jobs } from "@/schema";
import { jobCreateFormSchema } from "@/zod-schemas/job";
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

export const PATCH = (req: Request, { params }: { params: { id: string } }) =>
  api
    .create(req)
    .input({ body: jobCreateFormSchema.partial() })
    .procedure(async ({ ctx, input: { body } }) => {
      const paramId = z.string().min(1).parse(params.id);

      const query = await ctx.db.query.jobs.findFirst({
        where: eq(jobs.publicId, paramId),
      });

      if (!query) {
        throw new Error(`job with the id: ${paramId} not found`);
      }
      const updated = await ctx.db
        .update(jobs)
        .set({ ...body })
        .where(eq(jobs.publicId, paramId))
        .returning();

      revalidateTag(AllJobsCacheTag);
      revalidateTag(JobDetailCacheTag(query.publicId));

      return updated;
    });

export type TJobGetOneApiRes = InferApiRoute<typeof GET>;

export type TJobDeleteOneApiRes = InferApiRoute<typeof DELETE>;

export type TJobUpdateOneApiRes = InferApiRoute<typeof PATCH>;
