import { InferApiRoute, api } from "@/lib/api";
import { jobs } from "@/schema";
import { eq } from "drizzle-orm";
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

export type TJobGetOneApiRes = InferApiRoute<typeof GET>;
