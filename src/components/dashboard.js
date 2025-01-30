import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(Title, Tooltip, Legend);

const Dashboard = ({
  npvResult,
  cashFlows,
  handleCashFlowChange,
  removeCashFlow,
  addCashFlow,
}) => {
  if (!cashFlows) return null;

  const chartData = {
    labels: cashFlows.map((flow) => `Year ${flow.year}`),
    datasets: [
      {
        label: "Cash Flow",
        data: cashFlows.map((flow) => flow.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="container-fluid bg-black text-white vh-100">
      <nav className="navbar navbar-dark bg-dark px-3">
        <a className="navbar-brand" href="#">
          Dashboard
        </a>
      </nav>
      <div className="row mt-3">
        <div className="col-md-10 offset-md-1">
          <div className="card bg-primary text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Net Present Value</h5>
              <p className="card-text">${npvResult}</p>
            </div>
          </div>
          <ul className="list-group">
            {cashFlows.map((flow, index) => (
              <li key={index} className="list-group-item bg-dark text-white">
                Year {flow.year}:
                <input
                  type="number"
                  value={flow.amount}
                  onChange={(e) => handleCashFlowChange(index, e.target.value)}
                  className="mx-2"
                />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeCashFlow(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary mt-2" onClick={addCashFlow}>
            Add Cash Flow
          </button>
          <div className="row mt-4">
            <div className="col-md-6 offset-md-3">
              <Doughnut data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
