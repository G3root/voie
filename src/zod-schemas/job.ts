import * as z from "zod";

const JobTypes = [
  "part-time",
  "full-time",
  "contractor",
  "temporary",
  "internship",
] as const;
const JobLevels = ["entry", "Senior"] as const;
const JobLocationTypes = ["on-site", "hybrid", "remote"] as const;

export const JobTypeMap: Record<TType, string> = {
  "part-time": "Part-Time",
  "full-time": "Full-Time",
  contractor: "Contractor",
  internship: "Internship",
  temporary: "Temporary",
};

export const JobLevelMap: Record<TLevel, string> = {
  entry: "Entry Level",
  Senior: "Senior Level",
};

export const JobLocationTypeMap: Record<TLocationType, string> = {
  "on-site": "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

const Type = z.enum(JobTypes);
const Level = z.enum(JobLevels);
const LocationType = z.enum(JobLocationTypes);

export const jobModelFields = {
  id: z.number(),
  publicId: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  level: Level,
  type: Type,
  locationType: LocationType,
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
export type TLocationType = z.infer<typeof LocationType>;
export type TJobCreateFormSchema = z.infer<typeof jobCreateFormSchema>;
export type TJob = z.infer<typeof jobModel>;
