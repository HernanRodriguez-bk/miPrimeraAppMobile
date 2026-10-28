import { useCallback, useState } from 'react';

export function useToast() {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  return {
    toastMessage,
    toastVisible,
    showToast,
    hideToast,
  };
}

