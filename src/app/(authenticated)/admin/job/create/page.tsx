import { JobForm } from "@/components/forms/job-form";
import { PageLayout } from "../../components/page-layout";

export default function JobCreatePage() {
  return (
    <PageLayout title="Jobs" description="create your jobs">
      <JobForm isEditMode={false} />
    </PageLayout>
  );
}
