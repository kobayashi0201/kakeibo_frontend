"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { Transaction } from "@/src/types/types";
import { formatDate } from "@/src/utils/dateUtils";

interface RowData {
  id: number;
  date: string;
  amount: number;
  description: string | null;
}

interface CustomTableProps {
  data: Transaction[];
}

type Comparator<T> = (a: T, b: T) => number;

const descendingComparator = (
  a: RowData,
  b: RowData,
  orderBy: keyof RowData,
): number => {
  if ((b[orderBy] as number | string) < (a[orderBy] as number | string)) {
    return -1;
  }
  if ((b[orderBy] as number | string) > (a[orderBy] as number | string)) {
    return 1;
  }
  return 0;
};

const getComparator = (
  order: "asc" | "desc",
  orderBy: keyof RowData,
): Comparator<RowData> => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const sortedRowInformation = (
  array: RowData[],
  comparator: Comparator<RowData>,
): RowData[] => {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [RowData, number],
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const TransactionTableList: React.FC<CustomTableProps> = ({ data }) => {
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = React.useState<keyof RowData>("date");

  const handleRequestSort = (property: keyof RowData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const transformedData: RowData[] = data.map((transaction) => ({
    id: transaction.id,
    date: formatDate(transaction.date),
    amount: transaction.amount,
    description: transaction.description,
  }));

  const sortedData = sortedRowInformation(
    transformedData,
    getComparator(order, orderBy),
  );

  return (
    <TableContainer component={Paper} color="primary">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={orderBy === "date"}
                direction={orderBy === "date" ? order : "desc"}
                onClick={() => handleRequestSort("date")}
              >
                日付
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={orderBy === "amount"}
                direction={orderBy === "amount" ? order : "desc"}
                onClick={() => handleRequestSort("amount")}
              >
                金額（円）
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>内容</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row: RowData) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTableList;
