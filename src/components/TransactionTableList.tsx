"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Tooltip,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Transaction, Category } from "@/src/types/types";
import { formatDate } from "@/src/utils/dateUtils";
import { AppDispatch } from "@/src/features/store";
import { useDispatch } from "react-redux";
import {
  destoryTransaction,
  destoryMultipleTransactions,
} from "@/src/utils/api";

interface RowData {
  id: number;
  date: string;
  amount: number;
  description: string | null;
  transaction_type: string;
  category: string;
}

interface EnhancedTableToolbarProps {
  selected: number[];
  onDeleteSuccess: () => void;
  setSelected: (selected: number[]) => void;
  onNotify: (type: "success" | "error", action: "register" | "delete") => void;
}

interface CustomTableProps {
  transactionData: Transaction[];
  categoryData: Category[];
  onDeleteSuccess: () => void;
  onNotify: (type: "success" | "error", action: "register" | "delete") => void;
}

type Comparator<T> = (a: T, b: T) => number;

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
  selected,
  onDeleteSuccess,
  setSelected,
  onNotify,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = async (selectedIds: number[]) => {
    try {
      if (selectedIds.length === 1) {
        await dispatch(destoryTransaction(selectedIds[0]));
      } else {
        await dispatch(destoryMultipleTransactions(selectedIds));
      }
      onDeleteSuccess();
      onNotify("success", "delete");
      setSelected([]);
    } catch (error) {
      console.error(error);
      onNotify("error", "delete");
    }
  };

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        selected.length > 0 && {
          backgroundColor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        },
      ]}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} 件選択
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          収支一覧
        </Typography>
      )}
      {selected.length > 0 ? (
        <Tooltip title="削除">
          <IconButton onClick={() => handleDelete(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

const TransactionTableList: React.FC<CustomTableProps> = ({
  transactionData,
  categoryData,
  onDeleteSuccess,
  onNotify,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<keyof RowData>("date");
  const [selected, setSelected] = useState<number[]>([]);

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

  const transformedData: RowData[] = transactionData.map((transaction) => ({
    id: transaction.id,
    date: formatDate(transaction.date),
    amount: transaction.amount,
    description: transaction.description,
    transaction_type: transaction.transactionType,
    category: categoryData.find(
      (category) => category.id === transaction.categoryId,
    )?.name as string,
  }));

  const sortedData = sortedRowInformation(
    transformedData,
    getComparator(order, orderBy),
  );

  const handleRequestSort = (property: keyof RowData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  return (
    <Box>
      <EnhancedTableToolbar
        selected={selected}
        onDeleteSuccess={onDeleteSuccess}
        setSelected={setSelected}
        onNotify={onNotify}
      />
      <TableContainer component={Paper} color="primary">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "desc"}
                  onClick={() => handleRequestSort("date")}
                >
                  日付
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>カテゴリー</TableCell>
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
              <TableCell style={{ fontWeight: "bold" }}>収入/支出</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row: RowData) => {
              const isItemSelected = selected.includes(row.id);
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.transaction_type === "expense" ? "支出" : "収入"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionTableList;
