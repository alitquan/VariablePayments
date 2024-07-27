function fixedMonthlyPayments(initialBalance, apr, fixedMonthlyPayment) {
    let remainingBalance = initialBalance;
    let totalInterestPaid = 0;
    let monthlyRate = apr / 12 / 100; // Monthly interest rate as a decimal
    let month = 0;
  
    while (remainingBalance > 0) {
      month++;
      let interestPaid = remainingBalance * monthlyRate;
      let principalPaid = fixedMonthlyPayment - interestPaid;
      remainingBalance -= principalPaid;
      totalInterestPaid += interestPaid;
  
      if (remainingBalance < 0) {
        remainingBalance = 0;
      }
  
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
    }}


   function variableMonthlyPayments(initialBalance, apr, monthlyPayment) {
    let remainingBalance = initialBalance;
    let totalInterestPaid = 0;
    let monthlyRate = apr / 12 / 100; // Monthly interest rate as a decimal
    

      if (remainingBalance <= 0) {
        console.log('Balance already paid off');
        console.log(`Total interest paid: $${totalInterestPaid.toFixed(2)}`);
        console.log(`Total amount paid: $${(totalInterestPaid + initialBalance).toFixed(2)}`);
        return;
      }
  
      let interestPaid = remainingBalance * monthlyRate;
      let principalPaid = monthlyPayment - interestPaid;
      remainingBalance -= principalPaid;
      totalInterestPaid += interestPaid;
  
      if (remainingBalance < 0) {
        remainingBalance = 0;
      }
  
      console.log(`Interest Paid: $${interestPaid.toFixed(2)}`);
      console.log(`Principal Paid: $${principalPaid.toFixed(2)}`);
      console.log(`Remaining Principal: $${remainingBalance.toFixed(2)}`);
      console.log(`Total Interest Paid: $${totalInterestPaid.toFixed(2)}`);
      console.log('-------------------------');
      
      if (remainingBalance <= 0) {
        console.log('Balance fully paid off!');
        console.log(`Total interest paid: $${totalInterestPaid.toFixed(2)}`);
        console.log(`Total amount paid: $${(totalInterestPaid + initialBalance).toFixed(2)}`);
        return;
      }

  }

  async function main() {
    let initialBalance = 1000; // Replace with the actual initial balance
    let apr = 10; // Replace with the actual APR
    fixedMonthlyPayments(1000, 10, 100);
    let monthlyPayments= [100, 200, 300, 400, 500];
    for (let i = 0; i < monthlyPayments.length; i++) {
      variableMonthlyPayments(initialBalance, apr, monthlyPayments[i]);
    }}
  main();
    

