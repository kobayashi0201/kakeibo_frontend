"use client";
import TransactionForm from "@/src/components/TransactionForm";
import { SubmitButton, Modal, NotificationSnackbar } from "../../components/UI";
import { useState, useEffect } from "react";
import TransactionTableList from "@/src/components/TransactionTableList";
import { fetchTransactions } from "@/src/utils/api";
import { Transaction } from "@/src/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/features/store";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<"success" | "error">();
  const [snackbarAction, setSnackbarAction] = useState<"register" | "delete">();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSnackbar = (
    type: "success" | "error",
    action: "register" | "delete",
  ) => {
    setSnackbarStatus(type);
    setSnackbarAction(action);
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetch = async () => {
      const data = await dispatch(fetchTransactions());
      setTransactions(data.payload);
    };
    fetch();
  }, [isSubmitted, dispatch]);

  return (
    <div>
      <TransactionTableList
        data={transactions}
        onDeleteSuccess={() => setIsSubmitted(!isSubmitted)}
        onNotify={(type: "success" | "error", action: "register" | "delete") =>
          handleSnackbar(type, action)
        }
      />
      <br />
      <SubmitButton label="収支登録" onClick={handleOpenModal} />
      <Modal open={openModal} onClose={handleCloseModal} title="収支登録">
        <TransactionForm
          onClose={handleCloseModal}
          onNotify={(
            type: "success" | "error",
            action: "register" | "delete",
          ) => handleSnackbar(type, action)}
          onSubmitSuccess={() => setIsSubmitted(!isSubmitted)}
        />
      </Modal>
      <NotificationSnackbar notify={snackbarStatus} action={snackbarAction} />
    </div>
  );
}
