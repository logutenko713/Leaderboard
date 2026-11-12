interface UndoToastProps {
  message: string;
  onUndo: () => void;
}

export function UndoToast({ message, onUndo }: UndoToastProps) {
  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-md flex items-center justify-between gap-4 rounded-lg bg-on-surface px-4 py-3 text-white shadow-lg"
    >
      <span className="text-body-md">{message}</span>
      <button
        type="button"
        onClick={onUndo}
        className="shrink-0 text-label-md uppercase tracking-wider text-primary-container cursor-pointer"
      >
        Отменить
      </button>
    </div>
  );
}