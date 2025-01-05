import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { CalculatedMonthlyTransaction, Category } from "@/src/types/types";
import { formatDate } from "../utils/dateUtils";
import { schemeCategory10 } from "d3-scale-chromatic";

interface CustomPieChartProps {
  calculatedTransactionData: CalculatedMonthlyTransaction[];
  transactionType: string;
  category: Category[];
}

const COLORS = schemeCategory10;

const MyPieChart: React.FC<CustomPieChartProps> = ({
  calculatedTransactionData,
  transactionType,
  category,
}) => {
  const date = new Date();
  const beginningDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const data = calculatedTransactionData.find(
    (transaction) =>
      formatDate(transaction.month) === formatDate(beginningDate) &&
      transaction.transactionType === transactionType,
  );
  if (!data) {
    return <div>データがありません</div>;
  }
  const arrayData = Object.entries(data.totalByCategory).map(
    ([key, value]) => ({
      name: category.find((c) => c.id === Number(key))?.name,
      value: value,
    }),
  );

  return (
    <PieChart width={1000} height={400}>
      <Pie
        data={arrayData}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label={({ name, value }) => `${name}: ${value}`}
        startAngle={90}
        endAngle={-270}
      >
        {arrayData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MyPieChart;
