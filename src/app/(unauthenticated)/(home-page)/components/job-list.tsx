import { TJob } from "@/zod-schemas/job";
import { JobCard } from "./job-card";

export const JobList: React.FC<{ data: TJob[] }> = (props) => {
  const { data } = props;
  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <JobCard id={item.publicId} title={item.title} key={item.id} />
      ))}
    </div>
  );
};
