import { PageLayout } from "../../components/page-layout";
import { JobCreateForm } from "./components/form";

export default function JobCreatePage() {
  return (
    <PageLayout title="Jobs" description="create your jobs">
      <JobCreateForm />
    </PageLayout>
  );
}
