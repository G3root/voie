import { InferApiRoute, api } from "@/lib/api";
import { jobs } from "@/schema";
import { jobCreateFormSchema, jobGetSchema } from "@/zod-schemas/job";
import { eq } from "drizzle-orm";

export const POST = (req: Request) =>
  api
    .create(req)
    .input({ body: jobCreateFormSchema })
    .procedure(async ({ ctx, input }) => {
      return ctx.db.insert(jobs).values(input.body);
    });

export const GET = (req: Request) =>
  api
    .create(req)
    .input({ query: jobGetSchema })
    .procedure(async ({ ctx, input }) => {
      const {
        query: { id: jobId },
      } = input;
      const query = await ctx.db.query.jobs.findFirst({
        where: eq(jobs.publicId, jobId),
      });

      if (!query) {
        throw new Error(`job with the id:${jobId} not found`);
      }
      return query;
    });

export type TJobPostApiRes = InferApiRoute<typeof POST>;
export type TJobGetApiResp = InferApiRoute<typeof GET>;
