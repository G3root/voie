import { PageHeader, PageHeaderProps } from "@/components/common/page-header";
import { Fragment, ReactNode } from "react";

interface PageLayoutProps extends PageHeaderProps {
  children?: ReactNode;
  actions?: { id: string; element: ReactNode }[];
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { title, description, children, actions } = props;
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader title={title} description={description} />

        <div className="flex gap-x-2">
          {actions
            ? actions.map((item) => (
                <Fragment key={item.id}>{item.element}</Fragment>
              ))
            : null}
        </div>
      </div>
      {children}
    </div>
  );
};
