import * as z from "zod";

const JobTypes = ["part-time", "full-time"] as const;
const JobLevels = ["entry", "Senior"] as const;

export const JobTypeMap: Record<TType, string> = {
  "part-time": "Part-Time",
  "full-time": "Full-Time",
};

export const JobLevelMap: Record<TLevel, string> = {
  entry: "Entry Level",
  Senior: "Senior Level",
};

const Type = z.enum(JobTypes);
const Level = z.enum(JobLevels);

export const jobModelFields = {
  id: z.number(),
  publicId: z.string(),
  title: z.string(),
  description: z.string(),
  level: Level,
  type: Type,
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
};

export const jobModel = z.object({
  ...jobModelFields,
});

export const jobCreateFormSchema = jobModel.omit({
  id: true,
  publicId: true,
  createdAt: true,
  updatedAt: true,
});
export const jobGetSchema = z.object({ id: z.string() });

export type TType = z.infer<typeof Type>;
export type TLevel = z.infer<typeof Level>;
export type TJobCreateFormSchema = z.infer<typeof jobCreateFormSchema>;
export type TJob = z.infer<typeof jobModel>;
