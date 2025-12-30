interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "Nothing here",
  description = "No data available",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-muted">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};
