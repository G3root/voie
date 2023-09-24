import { InferApiRoute, api } from "@/lib/api";
import { generatePublicId } from "@/lib/nano-id";
import { jobs } from "@/schema";
import { jobCreateFormSchema } from "@/zod-schemas/job";

export const POST = (req: Request) =>
  api
    .create(req)
    .input({ body: jobCreateFormSchema })
    .procedure(async ({ ctx, input }) => {
      return ctx.db
        .insert(jobs)
        .values({ ...input.body, publicId: generatePublicId() });
    });

export const GET = (req: Request) =>
  api
    .create(req)
    .input(undefined)
    .procedure(async ({ ctx, input }) => {
      return ctx.db.select().from(jobs);
    });

export type TJobPostApiRes = InferApiRoute<typeof POST>;
export type TJobGetApiResp = InferApiRoute<typeof GET>;
