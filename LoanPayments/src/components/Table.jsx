import React from 'react'
import { useState } from 'react'
import './Table.module.css' 

 
const data = [
	{
		month: 1,
		monthlyPayment: 100,
		interestPaid: 25, 
		principalPaid: 75,
		remainingBalance: 925,
		totalInterestPaid: 25,
	},
	{
		month: 2,
		monthlyPayment: 100,
		interestPaid: 23.12, 
		principalPaid: 76.88,
		remainingBalance: 848.12,
		totalInterestPaid: 48.12,
	},

];



const Table = () => {
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
		</tbody>
		</table>
	);
};


export default Table; 
