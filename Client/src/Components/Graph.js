import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import Labels from "./Labels";

ChartJS.register(ArcElement, Tooltip);

export default function Graph({ data, totals }) {
  // Prepare data for chart
  const chart_Data = () => {
    return {
      datasets: [
        {
          data: [totals.Savings, totals.Expenses, totals.Investments],
          backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"], // Update colors if needed
          hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"], // Update hover colors if needed
        },
      ],
      labels: ["Savings", "Expenses", "Investments"],
    };
  };

  // Function to get total
  const getTotal = () => {
    return totals.Savings + totals.Expenses + totals.Investments;
  };

  // Chart options to enable tooltips
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label;
            const value = totals[label];
            return `${label}: Rs ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-content max-w-xs mx-auto mt-4">
      <div className="item">
        <div className="chart relative">
          <Doughnut data={chart_Data()} options={options} />
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              Rs {getTotal()}
            </span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4">
          {/* Labels with colored dots */}
          <Labels
            data={Object.entries(totals).map(([type, amount]) => ({
              type,
              amount,
              color: getColor(type),
            }))}
          />
        </div>
      </div>
    </div>
  );
}

// Helper function to get color for labels
const getColor = (type) => {
  switch (type) {
    case "Savings":
      return "#36A2EB";
    case "Expenses":
      return "#FFCE56";
    case "Investments":
      return "#FF6384";
    default:
      return "#000000"; // Default color
  }
};
