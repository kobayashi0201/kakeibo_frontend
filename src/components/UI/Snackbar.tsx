'use client'
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface CustomSnackbarProps {
  notify: "success" | "error" | undefined;
};

const NotificationSnackbar: React.FC<CustomSnackbarProps> = ({ notify }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    if (notify) {
      setSeverity(notify);
      setMessage(
        notify === "success"
          ? "収支が正常に登録されました。"
          : notify === "error"
          ? "収支の登録に失敗しました。"
          : ""
      );
      setOpen(true);
    }
  }, [notify]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotificationSnackbar;
