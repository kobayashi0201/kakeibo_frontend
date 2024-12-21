"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { fetchTransactions, createTransaction, fetchCategories } from "../utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { submitSchema } from "../validations/validationSchemas";
import { formatDate } from "../utils/dateUtils";
import { SubmitButton, InputField, MultipleLineInputField } from "./UI";
import styles from "./TransactionForm.module.css";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Category } from "../types/types";

type FormValues = {
  date: Date;
  amount: number;
  description?: string;
  transaction_type: string;
  categoryId: number;
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(submitSchema),
    defaultValues: {
      date: new Date(),
      amount: 0,
      description: "",
      transaction_type: "expense",
      categoryId: 1,
    },
  });

  useEffect(() => {
    const fetch = async () => {
      const fetchedCategories = await dispatch(fetchCategories());
      setCategories(fetchedCategories.payload);
      if (fetchedCategories.payload.length > 0) {
        const initialCategoryId = fetchedCategories.payload[0].id;
        setValue("categoryId", initialCategoryId);
      }
      setIsLoading(false);
    }
    fetch();
  }, [dispatch, setValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(
        createTransaction({
          amount: data.amount,
          date: formatDate(data.date),
          description: data.description,
          userId: 1,
          categoryId: data.categoryId,
          transaction_type: data.transaction_type,
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
      <Controller
        name="transaction_type"
        control={control}
        render={({ field }) => (
          <FormControl variant="standard">
            <Select
              labelId="transaction-type-label"
              className={styles.transactionTypeForm}
              {...field}
            >
              <MenuItem value="expense">支出</MenuItem>
              <MenuItem value="income">収入</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      {errors.transaction_type && (
        <p style={{ color: "red" }}>{errors.transaction_type.message}</p>
      )}
      <div className={styles.form}>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel id="category-label">カテゴリー</InputLabel>
              <Select
                {...field}
                labelId="category-label"
                label="カテゴリー"
                value={field.value ?? ""}
              >
                {categories.map((category: Category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              placeholderText="日付を選択してください"
              customInput={<InputField label="日付" placeholder="" />}
              className={styles.form}
            />
          )}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
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
