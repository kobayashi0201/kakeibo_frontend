"use client";
import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

interface CustomSnackbarProps {
  notify: "success" | "error" | undefined;
  action: "register" | "delete" | undefined;
}

const NotificationSnackbar: React.FC<CustomSnackbarProps> = ({
  notify,
  action,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    "success",
  );

  useEffect(() => {
    if (notify && action) {
      setSeverity(notify);
      setMessage(
        notify === "success" && action === "register"
          ? "収支が正常に登録されました。"
          : notify === "error" && action === "register"
            ? "収支の登録に失敗しました。"
            : notify === "success" && action === "delete"
              ? "収支が正常に削除されました。"
              : notify === "error" && action === "delete"
                ? "収支の削除に失敗しました。"
                : "",
      );
      setOpen(true);
    }
  }, [notify, action]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotificationSnackbar;
