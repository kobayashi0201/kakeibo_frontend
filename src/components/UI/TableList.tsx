import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from "@mui/material";

interface CustomTableProps {
  label: string[];
  data: Record<string, any>[];
}

type Comparator<T> = (a: T, b: T) => number;

const descendingComparator = <T extends Record<string, any>>(a: T, b: T, orderBy: string): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = <T extends Record<string, any>>(
  order: 'asc' | 'desc',
  orderBy: string
): Comparator<T> => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const sortedRowInformation = <T,>(array: T[], comparator: Comparator<T>): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const TableList: React.FC<CustomTableProps> = ({ label, data }) => {
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = React.useState<string>("date");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedData = sortedRowInformation(data, getComparator(order, orderBy));

  return (
    <TableContainer component={Paper} color="primary">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>
              <TableSortLabel
                active={orderBy === "date"}
                direction={orderBy === "date" ? order : "desc"}
                onClick={() => handleRequestSort("date")}
              >
                {label[0]}
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              <TableSortLabel
                active={orderBy === "amount"}
                direction={orderBy === "amount" ? order : "desc"}
                onClick={() => handleRequestSort("amount")}
              >
                {label[1]}
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              {label[2]}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row: any) => (
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

export default TableList;
