import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const About = () => {
  const data = {
    labels: ["M", "T", "W", "Th", "F", "S", "Su"],
    datasets: [
      {
        label: "Total Users",
        data: [20, 50, 80, 70, 100, 90, 120], // Random data
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Users: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Users",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="h-[280px] w-[390px] md:h-[500px] md:w-[800px] md:mt-6 md:ml-48 flex content-center items-center">
        <div className="p-4 bg-white rounded-lg shadow-md w-full h-full">
          <h2 className="text-sm md:text-xl font-semibold mb-4">
            User Growth Over the Week
          </h2>
          <Bar data={data} options={options} />
        </div>
      </div>
      <div>
        <div class="h-screen bg-gray-100  text-gray-800 ">
          <div class="container mx-auto px-4 py-8">
            <h2 class="text-3xl font-semibold text-center text-gray-800  mb-8">
              Featured Resources
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white  shadow-lg rounded-lg overflow-hidden">
                <img
                  src="/Day to day.jpg"
                  alt="Headless UI"
                  class="w-full h-64 object-cover"
                />
                <div class="p-4 md:p-6">
                  <h3 class="text-xl font-semibold text-indigo-500  mb-2">
                    Expense Categorization:
                  </h3>
                  <p class="text-gray-700 mb-4 two-lines">
                    This helps users track where their money is going and manage
                    their budget more effectively.
                  </p>
                </div>
              </div>

              <div class="bg-white  shadow-lg rounded-lg overflow-hidden">
                <img
                  src="detail analysis.jpg"
                  alt="Heroicons"
                  class="w-full h-64 object-cover"
                />
                <div class="p-4 md:p-6">
                  <h3 class="text-xl font-semibold text-purple-500  mb-2">
                    Data Visualization:
                  </h3>
                  <p class="text-gray-700  mb-4 two-lines">
                    Offers visual representations of spending data, such as
                    charts and graphs, to help users understand their financial
                    habits and trends
                  </p>
                </div>
              </div>

              <div class="bg-white  shadow-lg rounded-lg overflow-hidden">
                <img
                  src="/Savings.jpg"
                  alt="Hero Patterns"
                  class="w-full h-64 object-cover"
                />
                <div class="p-4 md:p-6">
                  <h3 class="text-xl font-semibold text-cyan-500  mb-2">
                    Savings Goal Tracking
                  </h3>
                  <p class="text-gray-700  mb-4 two-lines">
                    Enables users to set specific savings goals (e.g., saving
                    $1,000 for a vacation) and track their progress toward these
                    goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
