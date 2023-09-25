import {
  TJobGetOneApiRes,
  TJobDeleteOneApiRes,
} from "@/app/api/job/[id]/route";
import { TJobGetApiResp, TJobPostApiRes } from "@/app/api/job/route";
import { AllJobsCacheTag } from "@/lib/cache-tags";
import { TJobCreateFormSchema } from "@/zod-schemas/job";

export const getJobs = async () => {
  const req = await fetch("http://localhost:3000/api/job", {
    next: { tags: [AllJobsCacheTag] },
  });
  const res = (await req.json()) as TJobGetApiResp;

  return res;
};

export const getJobById = async (id: string) => {
  const req = await fetch(`http://localhost:3000/api/job/${id}`);
  const res = (await req.json()) as TJobGetOneApiRes;

  return res;
};

export const deleteJobById = async (id: string) => {
  const req = await fetch(`http://localhost:3000/api/job/${id}`, {
    method: "DELETE",
  });
  const res = (await req.json()) as TJobDeleteOneApiRes;

  return res;
};

export const createJob = async (data: TJobCreateFormSchema) => {
  const req = await fetch("/api/job", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const res = (await req.json()) as TJobPostApiRes;

  return res;
};
