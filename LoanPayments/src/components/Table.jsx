import React from 'react'
import styles from './Table.module.css'
import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  createRow,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';


 
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


const Table = () =>  { 
	const columns = useMemo(
		() => [
			{
				accessorKey: 'month', 
				header: 'Month',
				size: 150,
				Edit: () => null, 
			},
			{
				accessorKey: 'monthlyPayment',
				header: 'Monthly Payment',
				size: 150,
			},
			{
				accessorKey: 'interestPaid', 
				header: 'Interest Paid',
				size: 200,
				Edit: () => null, 
			},
			{
				accessorKey: 'principalPaid',
				header: 'Principal Paid',
				size: 150,
				Edit: () => null, 
			},
			{
				accessorKey: 'remainingBalance',
				header: 'Remaining Balance',
				size: 150,
				Edit: () => null, 
			},
			{

				accessorKey: 'totalInterestPaid',
				header: 'Total Interest Paid',
				size: 150,
				Edit: () => null, 
			},
		],
		[],
	);

	const table = useMaterialReactTable({
		columns,
		data,
		enableEditing: true,
		createDisplayMode: 'modal',
		editDisplayMode: 'modal',

		onCreatingRowSave: ({ table, values }) => {
			table.setCreatingRow(null); 
		},
		onCreatingRowCancel: () => {
		},
		renderTopToolbarCustomActions: ({ table }) => (
			<Button
			onClick={() => {
				console.log ("saved");
				table.setCreatingRow(
					createRow(table, {
						month: 10,
						monthlyPayment:5, 
						interestPaid:5, 
						principalPaid:5, 
						remainingBalance:5, 
						totalInterestPaid:5, 
					}),
				);
				console.log("saved2");
			}}
			>
			Create New User
			</Button>
		),
	});

return <MaterialReactTable table={table} />;
}


export default Table;
