interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-red-500">
      <p className="mb-3">{message}</p>

      {onRetry && (
        <button onClick={onRetry} className="rounded bg-red-500 px-4 py-2 text-white">
          Retry
        </button>
      )}
    </div>
  );
};
