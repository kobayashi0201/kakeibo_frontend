import * as yup from "yup";

export const submitSchema = yup.object().shape({
  amount: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue.trim() === "" ? null : value;
      }
      return value;
    })
    .nullable()
    .min(1, "0より大きい値を入力してください")
    .typeError("金額は数値で入力してください")
    .required("金額を入力してください"),
  date: yup.date().required("日付を入力してください"),
  description: yup.string().optional(),
});
