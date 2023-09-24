import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface JobCardProps {
  title: string;
  id: string;
}

export const JobCard: React.FC<JobCardProps> = (props) => {
  const { title, id } = props;
  return (
    <Link href={`job-list/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
