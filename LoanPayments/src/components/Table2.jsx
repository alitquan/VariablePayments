import React, { useState, useRef, useEffect } from 'react';
import styles from './Table.module.css';
import { variableMonthlyPayments } from '../calculation.js';

const initialData = [
  {
    month: 0,
    monthlyPayment: 0,
    interestPaid: 0, 
    principalPaid: 0,
    remainingBalance: 1000,
    totalInterestPaid: 0,
  },
];

const Table2 = () => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');
  const [newRowAdded, setNewRowAdded] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  
  const tableRef = useRef(null);
  const inputRefs = useRef([]);

  // Add new row when the data changes
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
    const calculations = JSON.parse(variableMonthlyPayments(prevRow['remainingBalance'], 5, 100));
    const newRow = {
      month: data.length,
      monthlyPayment: 100,
      interestPaid: parseFloat(calculations[0]["interestPaid"]),
      principalPaid: parseFloat(calculations[0]["principalPaid"]),
      remainingBalance: parseFloat(calculations[0]["remainingBalance"]),
      totalInterestPaid: data.length * 10,
    };

    setData(prevData => {
      const newData = [...prevData, newRow];
      setNewRowAdded(true);
      return newData;
    });
  };

  const handleMonthlyPaymentChange = (index, value) => {
    if (value === '' || isNaN(value)) {
      setError('Monthly payment cannot be empty or non-numeric');
    } else if (parseFloat(value) < 0) {
      setError('Monthly payment cannot be negative');
    } else {
      setError('');
      const updatedData = data.map((row, rowIndex) => {
        if (rowIndex === index) {
          const calculations = JSON.parse(variableMonthlyPayments(row['remainingBalance'], 5, value));
          return { 
            ...row, 
            monthlyPayment: value,
            interestPaid: parseFloat(calculations[0]["interestPaid"]),
            principalPaid: parseFloat(calculations[0]["principalPaid"]),
            remainingBalance: parseFloat(calculations[0]["remainingBalance"]),
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
          <td idName={styles.lastRow} className={styles.rowButton} colSpan="6">
            <button onClick={handleAddRow} id={styles.addButton}> + </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table2;
