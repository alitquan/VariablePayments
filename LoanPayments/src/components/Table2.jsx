import React from "react";
import { useState, useRef, useEffect } from "react";
import styles from "./Table.module.css";
import {
  fixedMonthlyPayments,
  variableMonthlyPayments,
} from "../calculation.js";


const Table2 = ( { formData = {} }) => {


 const initialData = [
  {
    month: 0,
    monthlyPayment: 5,
    interestPaid: 0, 
    principalPaid: 0,
    remainingBalance: formData["amountDue"],
    totalInterestPaid: 0,
    initalAPR: formData["apr"],
  },
 ];
  const { amountDue = "", apr = "" } = formData;
  const [data, setData] = useState(initialData);

  const [error, setError] = useState('');
  const [newRowAdded, setNewRowAdded] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  
  const tableRef = useRef(null);
  const inputRefs = useRef([]);
  

  useEffect(() => {
   // console.log("formData on render:", formData);
   // console.log("APR: ",formData["apr"]);
   // console.log("type of data: ", typeof formData["apr"]);
   const apr = parseFloat(formData["apr"])
   // console.log("stored APR: ", apr);
   // console.log("type of data: ", typeof apr);
  }, [formData]);

  useEffect(() => {
    if (newRowAdded) {
      input2ndtoLastRow();
      setNewRowAdded(false);
    }
  }, [data, newRowAdded]);

  // Handle clicks outside to exit edit mode
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRefs.current && !inputRefs.current.some(ref => ref && ref.contains(event.target))) {
        setEditableRow(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddRow = () => {
    const prevRow = getMostRecentRow();
    const _apr = parseFloat(formData["apr"]);
    console.log ("Detected APR: ", _apr);
    console.log ("HandleAddRow -- Previous Row: ", prevRow);
    console.log ("HandleAddRow -- Previous Row Interest Rate: ", prevRow["totalInterestPaid"]);
    const _prevPayment = prevRow ["monthlyPayment"];
    const calculations = JSON.parse(variableMonthlyPayments(prevRow['remainingBalance'], _apr, _prevPayment));
    const _interestPaid =  parseFloat(calculations[0]["interestPaid"]);
    const _prevInterest =  prevRow["totalInterestPaid"];
    const totalInterest =  _prevInterest + _interestPaid;
    
    const newRow = {
      month: data.length,
      monthlyPayment: _prevPayment,
      interestPaid: _interestPaid,
      principalPaid: parseFloat(calculations[0]["principalPaid"]),
      remainingBalance: parseFloat(calculations[0]["remainingBalance"]),
      totalInterestPaid: parseFloat(totalInterest.toFixed(2)),

    };

    setData(prevData => {

      const newData = [...prevData, newRow];
      setNewRowAdded(true);
      return newData;
    });
  };

  const handleMonthlyPaymentChange = (index, value) => {

    const _apr = parseFloat(formData["apr"]);
   

    if (value === '' || isNaN(value)) {
      console.log("test");
    } else if (parseFloat(value) < 0) {
      console.log("test");
    } else {

      setError('');
      const updatedData = data.map((row, rowIndex) => {
        if (rowIndex === index) {

          const prevRow = getMostRecentRow();
	  console.log("handleMonthly -- prevRow: ", prevRow);
          const calculations = JSON.parse(variableMonthlyPayments(prevRow['remainingBalance'], _apr, value));
          const _interestPaid =  parseFloat(calculations[0]["interestPaid"]);
          const _prevInterest =  prevRow["totalInterestPaid"];
          const totalInterest =  _prevInterest + _interestPaid;
          return { 
            ...row, 
            monthlyPayment: value,
            interestPaid: parseFloat(calculations[0]["interestPaid"]),
            principalPaid: parseFloat(calculations[0]["principalPaid"]),
            remainingBalance: parseFloat(calculations[0]["remainingBalance"]),

      	    totalInterestPaid: parseFloat(totalInterest.toFixed(2)),
          };
        }
        return row;
      });
      setData(updatedData);
    }
  };

  const getMostRecentRow = () => {
    return data.length ? data[data.length - 1] : null;
  };
   
   

  const input2ndtoLastRow = () => {
    const table = tableRef.current;

    if (table) {
      const rows = table.getElementsByTagName('tr');
      const secondToLastRow = rows[rows.length - 2];
      if (secondToLastRow) {
        secondToLastRow.scrollIntoView();
      }
    }
  };

  const handleCellClick = (index) => {
    if (editableRow === index) {
      setEditableRow(null);
    } else {
      setEditableRow(index);

    }
  };

 // determines if button should be shown based on remaining balance
  const shouldShowAddButton = () => {
    const lastRow = getMostRecentRow();
    return lastRow && lastRow.remainingBalance > 0;
  };

  return (
    <table ref={tableRef}>
      <thead>
        <tr>
          <th>Month</th>
          <th>Monthly Payment</th>
          <th>Interest Paid</th>
          <th>Principal Paid</th>
          <th>Remaining Balance</th>
          <th>Total Interest Paid</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.month}</td>
            <td onClick={() => handleCellClick(index)}>
              {editableRow === index ? (
                <>
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={row.monthlyPayment}
                    onChange={(e) => handleMonthlyPaymentChange(index, e.target.value)}
                    onBlur={() => setEditableRow(null)}
                    style={{
                      width: '80px',
                      fontSize: '0.8em',
                      padding: '5px'
                    }}
                    autoFocus
                  />
                  {error && <div className={styles.printedError}>{error}</div>}
                </>

              ) : (
                row.monthlyPayment
              )}
            </td>
            <td>{row.interestPaid}</td>
            <td>{row.principalPaid}</td>
            <td>{row.remainingBalance}</td>
            <td>{row.totalInterestPaid}</td>
          </tr>
        ))}
        <tr>

          <td className={styles.rowButton} colSpan="6">
          {
              <button onClick={handleAddRow} id={styles.addButton}> + </button>
	  }
          </td>
        </tr>

      </tbody>
    </table>
  );
};

export default Table2;
