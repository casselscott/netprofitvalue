import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const calculateNPV = (cashflows, discountRate) => {
  return cashflows.reduce((acc, curr, index) => {
    return acc + curr / Math.pow(1 + discountRate, index);
  }, 0);
};

const NPVCalculator = () => {
  const [industryData, setIndustryData] = useState({
    years: [],
    cashflows: [],
  });
  const [selectedIndustry, setSelectedIndustry] = useState(
    "Evaluate Investment"
  );
  const [discountRate, setDiscountRate] = useState(0.1);
  const [npvResult, setNpvResult] = useState(null);
  const [inputYear, setInputYear] = useState("");
  const [inputCashflow, setInputCashflow] = useState("");
  const [industryNPVResults, setIndustryNPVResults] = useState({
    "Evaluate Investment": 0,
    "Analyze Property": 0,
    "Projects and Machinery Rentals": 0,
    "R&D Investments": 0,
    "Capital Intensive": 0,
  });

  const handleIndustryChange = (selectedOption) => {
    setSelectedIndustry(selectedOption.value);
    setIndustryData({ years: [], cashflows: [] });
    setNpvResult(null);
    setInputYear("");
    setInputCashflow("");
  };

  const handleYearChange = (e) => setInputYear(e.target.value);
  const handleCashflowChange = (e) => setInputCashflow(e.target.value);

  const addCashflowData = () => {
    if (inputYear && inputCashflow) {
      setIndustryData({
        ...industryData,
        years: [...industryData.years, parseInt(inputYear)],
        cashflows: [...industryData.cashflows, parseFloat(inputCashflow)],
      });
      setInputYear("");
      setInputCashflow("");
    }
  };

  const handleCalculateNPV = () => {
    const npv = calculateNPV(industryData.cashflows, discountRate);
    setNpvResult(npv);
    setIndustryNPVResults({ ...industryNPVResults, [selectedIndustry]: npv });
  };

  const barData = {
    labels: industryData.years.map((year) => `Year ${year}`),
    datasets: [
      {
        label: `Cash Flow (Discount Rate: ${discountRate * 100}%)`,
        data: industryData.cashflows,
        backgroundColor: "#42A5F5",
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(industryNPVResults),
    datasets: [
      {
        data: Object.values(industryNPVResults),
        backgroundColor: [
          "#0d3b66",
          "#FF6384",
          "#36A2EB",
          "#FFCD56",
          "#4BC0C0",
        ],
      },
    ],
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="container bg-dark text-light p-4">
            <h2>Calculate the Net Profit Value</h2>
            <br></br>

            <Select
              className="w-50"
              options={[
                { value: "Evaluate Investment", label: "Evaluate Investment" },
                { value: "Analyze Property", label: "Analyze Property" },
                {
                  value: "Projects and Machinery Rentals",
                  label: "Projects and Machinery Rentals",
                },
                { value: "R&D Investments", label: "R&D Investments" },
                { value: "Capital Intensive", label: "Capital Intensive" },
              ]}
              onChange={handleIndustryChange}
              value={{ value: selectedIndustry, label: selectedIndustry }}
            />
            <br></br>
            <h3>Selected Industry: {selectedIndustry}</h3>
            <div classname="btn btn-secondary dropdown">
              <br></br>
              <input
                type="number"
                placeholder="Enter Year"
                value={inputYear}
                onChange={handleYearChange}
                className="form-control mb-3 w-50"
              />
              <input
                type="number"
                placeholder="Enter Cashflow"
                value={inputCashflow}
                onChange={handleCashflowChange}
                className="form-control mb-3 w-50"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Enter Discount Rate"
                value={discountRate}
                onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                className="form-control mb-3 w-50"
              />
              <button onClick={addCashflowData} className="btn btn-info">
                Add Cash Flow
              </button>

              <h4>Current Cash Flow Data:</h4>
              <ul>
                {industryData.years.map((year, index) => (
                  <li key={index}>
                    Year {year}: {industryData.cashflows[index]}
                  </li>
                ))}
              </ul>
              <button onClick={handleCalculateNPV} className="btn btn-success">
                Calculate NPV
              </button>
              {npvResult !== null && (
                <h3 className="text-success">NPV: {npvResult.toFixed(2)}</h3>
              )}
            </div>
            <Bar
              data={barData}
              options={{
                responsive: true,
                indexAxis: "y",
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        weight: "bold",
                      },
                      color: "white",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      font: {
                        weight: "bold",
                      },
                      color: "white",
                    },
                  },
                  y: {
                    ticks: {
                      font: {
                        weight: "bold",
                      },
                      color: "white",
                    },
                  },
                },
              }}
              className="chart-container"
            />
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        weight: "bold",
                      },
                      color: "white",
                    },
                  },
                },
              }}
              className="chart-container small-doughnut"
            />
          </div>
        </div>
        <div className="col-md-4">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/1.jpg"
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/2.jpg"
                alt="second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/3.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/4.jpg"
                alt="Fourth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/5.jpg"
                alt="Fifth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/6.png"
                alt="Six slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default NPVCalculator;
