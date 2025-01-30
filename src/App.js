import React from "react";
import NPVCalculator from "./components/npv"; // Correct the path
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <div className="App bg-dark text-white">
      <NPVCalculator />
    </div>
  );
};

export default App;
