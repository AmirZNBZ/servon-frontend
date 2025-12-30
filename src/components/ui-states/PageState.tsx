import { ReactNode } from "react";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";

interface PageStateProps {
  isLoading: boolean;
  error?: string | null;
  isEmpty: boolean;
  onRetry?: () => void;
  children: ReactNode;
}

export const PageState = ({ isLoading, error, isEmpty, onRetry, children }: PageStateProps) => {
  if (isLoading) return <LoadingState />;

  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  if (isEmpty) return <EmptyState />;

  return <>{children}</>;
};
