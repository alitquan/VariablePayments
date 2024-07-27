import React from 'react'
import { useState } from 'react'
import styles from './Table.module.css' 
import {
	fixedMonthlyPayments,
	variableMonthlyPayments
} from '../calculation.js' 
 
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
	
	const payment = 100;

	 // Function to add a new row to the table
	const handleAddRow = () => {
		const prevRow = getMostRecentRow(); 
		console.log("Prev Row: ", prevRow);
		const calculations = JSON.parse( variableMonthlyPayments( 
			prevRow['remainingBalance'],
			5,
			payment 
		));
		
		console.log("calculations", calculations[0]);
		console.log("calculations - interest paid", calculations[0]["interestPaid"]);
		// Convert values to numbers for calculations
		const interestPaidNum = parseFloat(calculations[0]["interestPaid"]);
		const principalPaidNum = parseFloat(calculations[0]["principalPaid"]);
		const remainingBalanceNum = parseFloat(calculations[0]["remainingBalance"]);
		const totalInterestPaidNum = parseFloat(calculations[0]["totalInterestPaid"]);
		const newRow = {
			month: data.length,
			monthlyPayment: payment,
			interestPaid: interestPaidNum,
			principalPaid: principalPaidNum,
			remainingBalance: remainingBalanceNum,// Example calculation
			totalInterestPaid: data.length * 10, // Example calculation
		};

		setData([...data, newRow]); // Update state with new row added
	};


	const getMostRecentRow = () => {
		if (data.length === 0) {
			return null;
		}
		return data[data.length - 1];
	};


	return (
		<table>
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
			<td>{row.monthlyPayment}</td>
			<td>{row.interestPaid}</td>
			<td>{row.principalPaid}</td>
			<td>{row.remainingBalance}</td>
			<td>{row.totalInterestPaid}</td>
			</tr>
		))}
		<td idName={styles.lastRow} className={styles.rowButton} colSpan="6" > 
			<button onClick={handleAddRow} id={styles.addButton}> + </button> 
		</td> 
		</tbody>
		</table>
	);
};


export default Table2; 
