import React, { useState } from "react";
import { CardContent } from "./components/cardcontent";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Textarea } from "./components/textarea";
import { Card } from "./components/card";



<Dashboard
npvResult={npvResult}
cashFlows={cashFlows}
handleCashFlowChange={handleCashFlowChange}
removeCashFlow={removeCashFlow}
addCashFlow={addCashFlow}
/>

const App = () => {
    const [npvResult, setNpvResult] = useState(0);
    const [cashFlows, setCashFlows] = useState([]);
    const [discountRate, setDiscountRate] = useState(5);
    const [amount, setAmount] = useState("");
    const [newYear, setNewYear] = useState("");
  
    useEffect(() => {
      console.log("Updated NPV Result:", npvResult);
    }, [npvResult]);
  
    const calculateNPV = () => {
      let npv = 0;
      cashFlows.forEach(({ year, amount }) => {
        npv += amount / Math.pow(1 + discountRate / 100, year);
      });
      setNpvResult(parseFloat(npv.toFixed(2)));
    };
    // Handle cash flow input
    const handleCashFlowChange = (index, event) => {
      const values = [...cashFlows];
      values[index][event.target.name] = event.target.value;
      setCashFlows(values);
    };
  
    // Add more years of cash flows
    const addCashFlow = () => {
      setCashFlows([...cashFlows, { year: "", amount: "" }]);
    };
  
    // Remove a cash flow entry
    const removeCashFlow = (index) => {
      const values = [...cashFlows];
      values.splice(index, 1);
      setCashFlows(values);
    };
  
    return (
      <div className="container mt-5">
        {/* Carousel Component */}
        <CarouselComponent />
  
        {/* NPV Calculator Card */}
        <div className="card shadow-lg p-4 mt-5">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">NPV Calculator</h2>
  
            <div className="form-group mb-3">
              <label htmlFor="discountRate">Discount Rate (%)</label>
              <input
                type="number"
                id="discountRate"
                className="form-control"
                placeholder="Enter Discount Rate"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              />
            </div>
  
            <h4 className="mt-4 mb-3">Cash Flows</h4>
            {cashFlows.map((cf, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <div className="form-group me-2">
                  <label htmlFor={`year-${index}`}>Year {index + 1}</label>
                  <input
                    type="number"
                    id={`year-${index}`}
                    className="form-control"
                    name="year"
                    value={cf.year}
                    onChange={(e) => handleCashFlowChange(index, e)}
                  />
                </div>
                <div className="form-group me-2">
                  <label htmlFor={`amount-${index}`}>Amount</label>
                  <input
                    type="number"
                    id={`amount-${index}`}
                    className="form-control"
                    name="amount"
                    value={cf.amount}
                    onChange={(e) => handleCashFlowChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeCashFlow(index)}
                >
                  Remove
                </button>
              </div>
            ))}
  
            <button
              type="button"
              className="btn btn-primary mb-4"
              onClick={addCashFlow}
            >
              Add Cash Flow
            </button>
  
            <button
              type="button"
              className="btn btn-sm btn-primary w-100 rounded"
              onClick={calculateNPV}
            >
              Calculate NPV
            </button>
  
            {npvResult !== null && (
              <div className="mt-4 text-center">
                <h4>Calculated NPV: ${npvResult}</h4>
              </div>
            )}  
            
          </div>
        </div>
      </div>
    );
  };
  
  export default App;
  