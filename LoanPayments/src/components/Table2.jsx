import React from 'react'
import { useState } from 'react'
import styles from './Table.module.css' 

 
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

	 // Function to add a new row to the table
	const handleAddRow = () => {
		const newRow = {
			month: data.length,
			monthlyPayment: 0,
			interestPaid: 0,
			principalPaid: 0,
			remainingBalance: 1000 - data.length * 100, // Example calculation
			totalInterestPaid: data.length * 10, // Example calculation
		};
		setData([...data, newRow]); // Update state with new row added
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
