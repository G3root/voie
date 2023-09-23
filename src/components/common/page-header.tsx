export interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, description } = props;
  return (
    <div className="mb-4 md:mb-8 flex flex-col">
      <div className="flex flex-col gap-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? <p className="text-sm">{description}</p> : null}
      </div>
    </div>
  );
};
