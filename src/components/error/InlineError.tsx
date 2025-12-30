export const InlineError = ({ message }: { message: string }) => {
  if (!message) return null;

  return <div className="text-sm text-red-500 bg-red-500/10 p-2 rounded">{message}</div>;
};
