import React from 'react'
import { useState, useRef, useEffect } from 'react'
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

	// error tracking
	const [error, setError] = useState('');
	
	// reference to the table itself
	const tableRef = useRef(null);
	useEffect(() => {
		const table = tableRef.current;
		console.log(table); // This should log the table element after the component has mounted
	}, []);


	const [newRowAdded, setNewRowAdded] = useState(false);


	useEffect(() => {
		if (newRowAdded) {
			input2ndtoLastRow();
			setNewRowAdded(false);
		}
	}, [data, newRowAdded]);


	const [editableRow, setEditableRow] = useState(null);

	useEffect(() => {
		if (newRowAdded) {
			setEditableRow(data.length - 1);
			setNewRowAdded(false);
		}
	}, [data, newRowAdded]);

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

		setData(prevData => {
			const newData = [...prevData, newRow];
			setNewRowAdded(true);
			return newData;
		});
	};

	const handleMonthlyPaymentChange = (index, value) => {
		if (value === '' || isNaN(value)) {
			setError('Monthly payment cannot be empty or non-numeric');
		}
		else if (value == null || parseFloat(value) < 0) {
			setError('Monthly payment cannot be negative');
		}
		else {
			setError('');
			const updatedData = data.map((row, rowIndex) => {
				if (rowIndex === index) {
					console.log("this is the row: ", row);

					// for comparisons
					const _remBal = row['remainingBalance'];

					const calculations = JSON.parse( variableMonthlyPayments( 
						row['remainingBalance'],
						5,
						value	
					));
					const interestPaidNum = parseFloat(calculations[0]["interestPaid"]);
					const principalPaidNum = parseFloat(calculations[0]["principalPaid"]);
					const remainingBalanceNum = parseFloat(calculations[0]["remainingBalance"]);


					return { ...row, 
						monthlyPayment: value,
						interestPaid: interestPaidNum,
						principalPaid: principalPaidNum,
						remainingBalance: remainingBalanceNum,};
				}
				return row;
			});
			console.log ("updatedData: ", updatedData);
			setData(updatedData);
		}
	};


	const getMostRecentRow = () => {
		if (data.length === 0) {
			return null;
		}
		return data[data.length - 1];
	};

	

	const input2ndtoLastRow = () => {
		const table = tableRef.current;
		console.log("working");

		if (table) {
			console.log ("table here");
			const rows = table.getElementsByTagName('tr');
			const secondToLastRow = rows[rows.length-1];
			console.log("second to last row: ", secondToLastRow); // You can do whatever you need with the second-to-last row here
		}
	};



	const inputRefs = useRef([]);

	useEffect(() => {
		// Function to handle click outside of the input
		const handleClickOutside = (event) => {
			if (inputRefs.current && !inputRefs.current.some(ref => ref && ref.contains(event.target))) {
				setEditableRow(null);
			}
		};

		// Attach event listener
		document.addEventListener('mousedown', handleClickOutside);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

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
			<td>
			{editableRow === index ? (
				<>
				<input
					ref={(el) => (inputRefs.current[index] = el)}
					type="text"
					value={row.monthlyPayment}
					onChange={(e) => handleMonthlyPaymentChange(index, e.target.value)}
					style={{
						width: '80px', // Adjust width as needed
						fontSize: '0.8em',
						padding: '5px'
					}}

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
		<td idName={styles.lastRow} className={styles.rowButton} colSpan="6" > 
			<button onClick={handleAddRow} id={styles.addButton}> + </button> 
		</td> 
		</tbody>
		</table>
	);
};


export default Table2; 
