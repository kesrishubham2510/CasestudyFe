import { useEffect } from "react";

import './toast.css';

function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      {message}
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
}

export default Toast;