import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  // Assume initial balance and APR are already provided
  let initialBalance = 1000; // Replace with the actual initial balance
  let apr = 10; // Replace with the actual APR

  // Initialize state variables
  let remainingBalance = initialBalance;
  let totalInterestPaid = 0;
  let monthlyRate = apr / 12 / 100; // Monthly interest rate as a decimal 
  let month = 0;

  // Ask user if the amount to be paid is fixed or variable
  let paymentType = await promptUser("Is the amount you will pay fixed or variable? (fixed/variable): ");
  
  if (paymentType.toLowerCase() === 'fixed') {
    // If fixed, prompt for the fixed monthly payment amount
    let fixedMonthlyPayment = parseFloat(await promptUser("Enter the fixed monthly payment amount: "));
    
    while (remainingBalance > 0) {
      // Increment the month
      month++;
      
      // Calculate interest for the current month
      let interestPaid = remainingBalance * monthlyRate;
      
      // Calculate principal paid for the current month
      let principalPaid = fixedMonthlyPayment - interestPaid;
      
      // Update the remaining balance
      remainingBalance -= principalPaid;
      
      // Accumulate the total interest paid
      totalInterestPaid += interestPaid;
      
      // Ensure remaining balance does not become negative
      if (remainingBalance < 0) {
        remainingBalance = 0;
      }
      
      // Display the values for the current month
      console.log(`Month: ${month}`);
      console.log(`Interest Paid: $${interestPaid.toFixed(2)}`);
      console.log(`Principal Paid: $${principalPaid.toFixed(2)}`);
      console.log(`Remaining Principal: $${remainingBalance.toFixed(2)}`);
      console.log(`Total Interest Paid: $${totalInterestPaid.toFixed(2)}`);
      console.log('-------------------------');
      
      if (remainingBalance <= 0) {
        console.log('Balance fully paid off!');
        console.log(`Total months: ${month}`);
        console.log(`Total interest paid: $${totalInterestPaid.toFixed(2)}`);
        console.log(`Total amount paid: $${(totalInterestPaid + initialBalance).toFixed(2)}`);
        break;
      }
    }
  } else if (paymentType.toLowerCase() === 'variable') {
    // If variable, proceed with monthly input and calculations
    while (remainingBalance > 0) {
      // Increment the month
      month++;
      
      // Prompt user for monthly payment
      let monthlyPayment = parseFloat(await promptUser("Enter the monthly payment: "));
      
      if (remainingBalance <= 0) {
        console.log('Balance already paid off');
        console.log(`Total months: ${month}`);
        console.log(`Total interest paid: $${totalInterestPaid.toFixed(2)}`);
        console.log(`Total amount paid: $${(totalInterestPaid + initialBalance).toFixed(2)}`);
        break;
      }
      
      // Calculate interest for the current month
      let interestPaid = remainingBalance * monthlyRate;
      
      // Calculate principal paid for the current month
      let principalPaid = monthlyPayment - interestPaid;
      
      // Update the remaining balance
      remainingBalance -= principalPaid;
      
      // Accumulate the total interest paid
      totalInterestPaid += interestPaid;
      
      // Ensure remaining balance does not become negative
      if (remainingBalance < 0) {
        remainingBalance = 0;
      }
      
      // Display the values for the current month
      console.log(`\nMonth: ${month}`);
      console.log(`Interest Paid: $${interestPaid.toFixed(2)}`);
      console.log(`Principal Paid: $${principalPaid.toFixed(2)}`);
      console.log(`Remaining Principal: $${remainingBalance.toFixed(2)}`);
      console.log(`Total Interest Paid: $${totalInterestPaid.toFixed(2)}`);
      console.log('-------------------------');
      
      if (remainingBalance <= 0) {
        console.log('Balance fully paid off!');
        console.log(`Total months: ${month}`);
        console.log(`Total interest paid: $${totalInterestPaid.toFixed(2)}`);
        console.log(`Total amount paid: $${(totalInterestPaid + initialBalance).toFixed(2)}`);
        break;
      }
      
      // Ask if the user wants to continue with another monthly payment
      let continuePayment = await promptUser("Do you want to continue with another monthly payment? (yes/no): ");
      if (continuePayment.toLowerCase() !== 'yes') {
        break;
      }
    }
  } else {
    console.log("Invalid input. Please enter 'fixed' or 'variable'.");
  }
  
  rl.close();
}

main();
