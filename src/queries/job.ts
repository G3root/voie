import { TJobGetApiResp } from "@/app/api/job/route";

export const getJobs = async () => {
  const req = await fetch("http://localhost:3000/api/job");
  const res = (await req.json()) as TJobGetApiResp;

  return res;
};
