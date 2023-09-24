import { getJobById } from "@/queries/job";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, message, success } = await getJobById(params.id);

  if (!success) {
    throw new Error(message);
  }
  return (
    <div>
      <ul>
        <li>{data.title}</li>
        <li>{data.description}</li>
        <li>{data.level}</li>
      </ul>
    </div>
  );
}
