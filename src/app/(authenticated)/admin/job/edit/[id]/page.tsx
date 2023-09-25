import { JobForm } from "@/components/forms/job-form";
import { PageLayout } from "../../../components/page-layout";
import { getJobById } from "@/queries/job";

export default async function JobEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, message, success } = await getJobById(params.id);

  if (!success) {
    throw new Error(message);
  }
  return (
    <PageLayout title={data.title}>
      <JobForm isEditMode={true} jobId={data.publicId} data={data} />
    </PageLayout>
  );
}
