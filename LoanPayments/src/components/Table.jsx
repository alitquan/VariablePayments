import React from "react";
import { useState, useEffect } from "react";
import "./Table.module.css";

const Table1 = ({ formData = {} }) => {
  console.log("FormData received in Table:", formData); // Debugging log

  // Destructure and default to empty strings if not provided
  const { amountDue = "", apr = "", inputValue = "" } = formData;

  // Parse values to numbers
  const principal = parseFloat(amountDue);
  const annualRate = parseFloat(apr) / 100;
  const monthlyPayment = parseFloat(inputValue);

  console.log(
    "Parsed values - Principal:",
    principal,
    "Annual Rate:",
    annualRate,
    "Monthly Payment:",
    monthlyPayment
  ); // Debugging log

  // Check for invalid input values
  if (
    isNaN(principal) ||
    isNaN(annualRate) ||
    isNaN(monthlyPayment) ||
    monthlyPayment <= 0
  ) {
    console.error("Invalid input data - Check parsed values and input format");
    return <p>Invalid input data</p>;
  }

  // Monthly interest rate
  const monthlyRate = annualRate / 12;

  // Initialize variables
  let balance = principal;
  let totalInterestPaid = 0;
  let monthNumber = 0;
  let totalAmountPaid = 0;
  const rows = [];

  while (balance > 0) {
    monthNumber++;
    const interestPaid = balance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    balance -= principalPaid;

    if (balance < 0) {
      balance = 0; // Ensures that balance doesn't go negative
    }

    totalInterestPaid += interestPaid;
    totalAmountPaid = totalInterestPaid + principal;
    rows.push({
      month: monthNumber,
      monthlyPayment: monthlyPayment.toFixed(2),
      principalPaid: principalPaid.toFixed(2),
      interestPaid: interestPaid.toFixed(2),
      remainingBalance: balance.toFixed(2),
    });
  }

  return (
    <div className="table-container">
      <h2>Loan Repayment Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Monthly Payment</th>
            <th>Principal Paid</th>
            <th>Interest Paid</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="5">No data to display</td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index}>
                <td>{row.month}</td>
                <td>${row.monthlyPayment}</td>
                <td>${row.principalPaid}</td>
                <td>${row.interestPaid}</td>
                <td>${row.remainingBalance}</td>
              </tr>
            ))
          )}
          {rows.length > 0 && (
            <tr>
              <td colSpan="3">Total Interest Paid</td>
              <td colSpan="2">${totalInterestPaid.toFixed(2)}</td>
            </tr>
          )}
          {rows.length > 0 && (
            <tr>
              <td colSpan="3">Total Amount Paid</td>
              <td colSpan="2">${totalAmountPaid.toFixed(2)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// const Table = () => {
// 	return (
// 		<table>
// 		<thead>
// 		<tr>
// 			<th>Month</th>
// 			<th>Monthly Payment</th>
// 			<th>Interest Paid</th>
// 			<th>Principal Paid</th>
// 			<th>Remaining Balance</th>
// 			<th>Total Interest Paid</th>
// 		</tr>
// 		</thead>
// 		<tbody>
// 		{data.map((row, index) => (
// 			<tr key={index}>
// 			<td>{row.month}</td>
// 			<td>{row.monthlyPayment}</td>
// 			<td>{row.interestPaid}</td>
// 			<td>{row.principalPaid}</td>
// 			<td>{row.remainingBalance}</td>
// 			<td>{row.totalInterestPaid}</td>
// 			</tr>
// 		))}
// 		</tbody>
// 		</table>
// 	);
// };

// export default Table;
export default Table1;
