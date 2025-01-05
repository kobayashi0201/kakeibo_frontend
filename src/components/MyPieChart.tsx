import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
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
    <div style={{ width: "100%", height: "50vh" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={arrayData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            innerRadius={75}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}円`}
            startAngle={90}
            endAngle={-270}
          >
            {arrayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20px"
            fill="#000"
          >
            合計：{Math.round(data.total)}円
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyPieChart;
