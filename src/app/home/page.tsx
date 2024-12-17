"use client";
import TransactionForm from "@/src/components/TransactionForm";
import { SubmitButton, Modal, NotificationSnackbar } from "../../components/UI";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import TransactionTableList from "@/src/components/TableList";
import { fetchTransactions } from "@/src/utils/api";
import { Transaction } from "@/src/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/features/store";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<"success" | "error">();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSnackbar = (type: "success" | "error") => {
    if (!openSnackbar) {
      setOpenSnackbar(type);
    }
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
      <TransactionTableList data={transactions} />
      <br />
      <SubmitButton label="収支登録" onClick={handleOpenModal} />
      <Modal open={openModal} onClose={handleCloseModal} title="収支登録">
        <TransactionForm
          onClose={handleCloseModal}
          onNotify={(type: "success" | "error") => handleSnackbar(type)}
          onSubmitSuccess={() => setIsSubmitted(!isSubmitted)}
        />
      </Modal>
      <NotificationSnackbar notify={openSnackbar} />
    </div>
  );
}
