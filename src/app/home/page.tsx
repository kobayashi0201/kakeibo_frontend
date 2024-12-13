"use client";
import TransactionForm from "@/src/components/TransactionForm";
import { SubmitButton, Modal, NotificationSnackbar } from "../../components/UI";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<"success" | "error">();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSnackbar = (type: "success" | "error") => {
    if (!openSnackbar) {
      setOpenSnackbar(type);
    }
  };

  return (
    <div>
      <h1>収支一覧</h1>
      <br />
      <SubmitButton label="収支登録" onClick={handleOpenModal} />
      <Modal open={openModal} onClose={handleCloseModal} title="収支登録">
        <TransactionForm
          onClose={handleCloseModal}
          onNotify={(type: "success" | "error") => handleSnackbar(type)}
        />
      </Modal>
      <NotificationSnackbar notify={openSnackbar} />
    </div>
  );
}
