import { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(({ type, message }) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
