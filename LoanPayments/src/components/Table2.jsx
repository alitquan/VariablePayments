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
    initalAPR: formData["apr"] || 0,
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
    const newValue = value === '' ? '0' : value;
    const numberValue = parseFloat(newValue);
    const _apr = parseFloat(formData["apr"]); 
    const prevRow = getSecondtoLastRow(); 
    const prevBalance = prevRow ? prevRow['remainingBalance'] : 0;

    console.log("Handle Monthly Payment Change prevBalance: ", prevBalance);	   

    // Check if the value is a valid number and not negative
    if (isNaN(numberValue) || numberValue < 0) {
       setError('Monthly payment must be a positive number');
       return; // Exit if the value is invalid
    }
    if ( numberValue > prevBalance ) {
	setError("Refrain from overpaying");
	return;
    }
    // Always use the last row for calculations
    const lastRow = getMostRecentRow();
    if (!lastRow) {
        return;
    }

    // Clear error if value is valid
    setError('');

      const updatedData = data.map((row, rowIndex) => {
        if (rowIndex === index) {

          const prevRow = getMostRecentRow();
	  console.log("handleMonthly -- prevRow: ", prevRow);
          const calculations = JSON.parse(variableMonthlyPayments(prevBalance, _apr, value));
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
    
  };

  // const getMostRecentRow = () => {
  //   console.log("getMostRecentRow -- all data: ",data);
  //   return data.length ? data[data.length - 1] : null;
  // };

  // const getSecondtoLastRow = () => {
  //   console.log("This is second to last row: ", data[data.length - 2])
  //   return data.length > 2 ? data [data.length - 2]: getMostRecentRow; 	 
  // };
  const getMostRecentRow = () => {
    return data.length ? data[data.length - 1] : null;
  };

  const getSecondtoLastRow = () => {
    return data.length > 1 ? data[data.length - 2] : getMostRecentRow();
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


 // Calculate total payments
  const calculateTotalPayments = () => {
    const lastRow = getMostRecentRow();
    const secondToLastRow = getSecondtoLastRow();
    console.log ("calc tot pay SecondToLastRow: ", secondToLastRow);
    console.log ("calc tot pay lastRow: ", lastRow); 
    const excess = lastRow["monthlyPayment"] - secondToLastRow["remainingBalance"];
    console.log ("Excess: ", excess);

    return data.reduce((total, row) => total + parseFloat(row.monthlyPayment || 0), 0) - excess;
  };

  const totalPayments = calculateTotalPayments();

  const calculateExcess = () => {

  }


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

	    {getMostRecentRow().remainingBalance <= 0 ? (
	     <div>
                <div className={styles.loanPaidOffMessage}>Loan has been paid off</div>
	  	<div className={styles.totalPaymentsMessage}>
                  Total Payments Made: ${totalPayments.toFixed(2)}
                </div>
	     </div>
            ) : (
              <button onClick={handleAddRow} id={styles.addButton}> + </button>
            )}

          </td>
        </tr>

      </tbody>
    </table>
  );
};

export default Table2;
