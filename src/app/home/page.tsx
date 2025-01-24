"use client";
import TransactionForm from "@/src/components/TransactionForm";
import {
  SubmitButton,
  Modal,
  NotificationSnackbar,
  MyPieChart,
  ToggleButtonComponent,
} from "../../components/UI";
import { useState, useEffect } from "react";
import TransactionTableList from "@/src/components/TransactionTableList";
import { fetchTransactions, fetchCategories } from "@/src/utils/api";
import {
  Transaction,
  Category,
  CalculatedMonthlyTransaction,
} from "@/src/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/features/store";
import { fetchCalculatedMonthlyTransactions } from "@/src/utils/api";
import styles from "./page.module.css";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<"success" | "error">();
  const [snackbarAction, setSnackbarAction] = useState<"register" | "delete">();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [calculatedMonthlyTransactions, setCalculatedMonthlyTransactions] =
    useState<CalculatedMonthlyTransaction[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("支出");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSnackbar = (
    type: "success" | "error",
    action: "register" | "delete",
  ) => {
    setSnackbarStatus(type);
    setSnackbarAction(action);
  };
  const handleToggleChange = (newOption: string) => {
    setSelectedOption(newOption);
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetch = async () => {
      const transactionData = await dispatch(fetchTransactions());
      const categoryData = await dispatch(fetchCategories());
      const calculatedMonthlyTransactionData = await dispatch(
        fetchCalculatedMonthlyTransactions(),
      );
      setTransactions(transactionData.payload);
      setCategories(categoryData.payload);
      setCalculatedMonthlyTransactions(
        calculatedMonthlyTransactionData.payload,
      );
    };
    fetch();
  }, [isSubmitted, dispatch]);

  return (
    <div>
      <h1 className={styles.title}>今月の収支</h1>
      <div className={styles.toggleButton}>
        <ToggleButtonComponent
          label={["支出", "収入"]}
          handleToggleChange={handleToggleChange}
        />
      </div>
      <MyPieChart
        calculatedTransactionData={calculatedMonthlyTransactions}
        transactionType={selectedOption === "支出" ? "expense" : "income"}
        category={categories}
      />
      <TransactionTableList
        transactionData={transactions}
        categoryData={categories}
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
