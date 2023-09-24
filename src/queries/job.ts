import { TJobGetOneApiRes } from "@/app/api/job/[id]/route";
import { TJobGetApiResp, PostCacheTag } from "@/app/api/job/route";

export const getJobs = async () => {
  const req = await fetch("http://localhost:3000/api/job", {
    next: { tags: [PostCacheTag] },
  });
  const res = (await req.json()) as TJobGetApiResp;

  return res;
};

export const getJobById = async (id: string) => {
  const req = await fetch(`http://localhost:3000/api/job/${id}`);
  const res = (await req.json()) as TJobGetOneApiRes;

  return res;
};
