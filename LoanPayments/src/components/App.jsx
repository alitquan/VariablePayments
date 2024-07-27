import { useState } from "react";
import "./App.css";
import Table1 from "./Table.jsx"; // Ensure this path is correct

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    amountDue: "",
    apr: "",
    inputValue: "",
    month: "",
  });
  const [showTable, setShowTable] = useState(false); // Add state to control table visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formData.amountDue || !formData.apr || !formData.inputValue) {
      console.error("Form data is incomplete");
      return;
    }
    console.log("Submitting data:", formData); // Debugging log
    setShowTable(true); // Show the table when form is submitted
  };

  const handleReset = () => {
    setFormData({
      amountDue: "",
      apr: "",
      inputValue: "",
      month: "",
    });
    setSelectedOption(null);
    setIsOpen(false);
    setShowTable(false); // Hide the table when resetting
  };

  const options = ["Pick Static Amount", "Pick Amount Month by Month"];

  return (
    <>
      <h1>Credit Card Calculator</h1>
      <div className="container">
        <div className="input-amount">
          <h2>Amount Due </h2>
          <input
            type="text"
            name="amountDue"
            value={formData.amountDue}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-apr">
          <h2>Yearly APR</h2>
          <input
            type="text"
            name="apr"
            value={formData.apr}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-type">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedOption || "Select an Option"}
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
          {selectedOption === "Pick Static Amount" && (
            <div className="input-container-1">
              <h3>Monthly Amount</h3>
              <input
                type="text"
                name="inputValue"
                placeholder="Enter amount"
                value={formData.inputValue}
                onChange={handleInputChange}
              />
            </div>
          )}
          {selectedOption === "Pick Amount Month by Month" && (
            <div className="input-container-2">
              <h2>Month</h2>
              <input
                type="text"
                name="month"
                placeholder="Enter the month"
                value={formData.month}
                onChange={handleInputChange}
              />
              <h2>Month Amount</h2>
              <input
                type="text"
                name="inputValue"
                placeholder="Enter amount"
                value={formData.inputValue}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
        {showTable && <Table1 formData={formData} />}
      </div>
    </>
  );
}

export default App;
