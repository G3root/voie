import { PageHeader, PageHeaderProps } from "@/components/common/page-header";
import { ReactNode } from "react";

interface PageLayoutProps extends PageHeaderProps {
  children?: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { title, description, children } = props;
  return (
    <div>
      <PageHeader title={title} description={description} />
      {children}
    </div>
  );
};
