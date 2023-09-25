import { InferApiRoute, api } from "@/lib/api";
import { AllJobsCacheTag } from "@/lib/cache-tags";
import { generatePublicId } from "@/lib/nano-id";
import { jobs } from "@/schema";
import { jobCreateFormSchema } from "@/zod-schemas/job";
import { revalidateTag } from "next/cache";
export const POST = (req: Request) =>
  api
    .create(req)
    .input({ body: jobCreateFormSchema })
    .procedure(async ({ ctx, input }) => {
      const data = ctx.db
        .insert(jobs)
        .values({ ...input.body, publicId: generatePublicId() });
      revalidateTag(AllJobsCacheTag);
      return data;
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
