import { useEffect, useRef, useState } from 'react';

export type SaveStatus = 'saved' | 'saving';

const SAVE_DELAY_MS = 800;

export function useAutosave<T>(value: T): SaveStatus {
  const [status, setStatus] = useState<SaveStatus>('saved');
  const previous = useRef(value);

  useEffect(() => {
    if (previous.current === value) return;
    previous.current = value;

    setStatus('saving');
    const timer = setTimeout(() => {
      // TODO: здесь будет запрос на бэк, который сохранит value
      setStatus('saved');
    }, SAVE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [value]);

  return status;
}