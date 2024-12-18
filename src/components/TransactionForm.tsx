"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { fetchTransactions, createTransaction } from "../utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { submitSchema } from "../validations/validationSchemas";
import { formatDate } from "../utils/dateUtils";
import { SubmitButton, InputField, MultipleLineInputField } from "./UI";
import styles from "./TransactionForm.module.css";

type FormValues = {
  date: Date;
  amount: number;
  description?: string;
};

type TransactionFormProps = {
  onClose: () => void;
  onNotify: (type: "success" | "error", action: "register" | "delete") => void;
  onSubmitSuccess: () => void;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  onClose,
  onNotify,
  onSubmitSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(submitSchema),
    defaultValues: {
      date: new Date(),
      amount: 0,
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(
        createTransaction({
          amount: data.amount,
          date: formatDate(data.date),
          description: data.description,
          userId: 73,
          categoryId: 37,
        }),
      );
      await dispatch(fetchTransactions());
      reset();
      onSubmitSuccess();
      onNotify("success", "register");
      onClose();
    } catch {
      reset();
      onNotify("error", "register");
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="金額"
              placeholder="金額を入力してください"
            />
          )}
        />
        {errors.amount && (
          <p style={{ color: "red" }}>{errors.amount.message}</p>
        )}
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              placeholderText="日付を選択してください"
              customInput={<InputField label="日付" placeholder="" />}
            />
          )}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <MultipleLineInputField
              {...field}
              label="内容"
              placeholder="内容を入力してください"
              rows={3}
            />
          )}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}
      </div>
      <div className={styles.submitButton}>
        <SubmitButton label="登録" type="submit" />
      </div>
    </form>
  );
};

export default TransactionForm;
