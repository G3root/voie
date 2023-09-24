import { JobList } from "./components/job-list";
import { getJobs } from "@/queries/job";
export default async function Home() {
  const jobs = await getJobs();

  if (!jobs.success) {
    throw new Error(jobs.message);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="p-24">
        <JobList data={jobs.data} />
      </div>
    </div>
  );
}
