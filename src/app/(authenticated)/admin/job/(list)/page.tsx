import { getJobs } from "@/queries/job";
import { PageLayout } from "../../components/page-layout";
import { JobListTable } from "./components/job-list-table";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function JobListPage() {
  const jobList = await getJobs();
  return (
    <PageLayout
      title="Jobs"
      description="Here is a list of your current job postings"
      actions={[
        {
          id: "create-job",
          element: (
            <Link className={buttonVariants()} href="/admin/job/create">
              create job
            </Link>
          ),
        },
      ]}
    >
      {jobList.success ? <JobListTable data={jobList.data} /> : null}
    </PageLayout>
  );
}
