export function fixedMonthlyPayments(initialBalance, apr, fixedMonthlyPayment) {
    let remainingBalance = initialBalance;
    let totalInterestPaid = 0;
    let monthlyRate = apr / 12 / 100; // Monthly interest rate as a decimal
    let month = 0;
    const paymentDetails = [];
  
    while (remainingBalance > 0) {
      month++;
      let interestPaid = remainingBalance * monthlyRate;
      let principalPaid = fixedMonthlyPayment - interestPaid;
      remainingBalance -= principalPaid;
      totalInterestPaid += interestPaid;
  
      if (remainingBalance < 0) {
        remainingBalance = 0;
      }

      const monthDetails = {
        month,
        interestPaid: interestPaid.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
        remainingBalance: remainingBalance.toFixed(2),
        totalInterestPaid: totalInterestPaid.toFixed(2)
      };
      paymentDetails.push(monthDetails);
  

      if (remainingBalance <= 0) {
        paymentDetails.push({
          message: 'Balance fully paid off!',
          totalMonths: month,
          totalInterestPaid: totalInterestPaid.toFixed(2),
          totalAmountPaid: (totalInterestPaid + initialBalance).toFixed(2)
        });
        break;
      }
    }
  
    const jsonString = JSON.stringify(paymentDetails, null, 2);
    //console.log('Fixed payment details JSON string:', jsonString);
    return jsonString;
  }
  

export function variableMonthlyPayments(remainingBalance, apr, monthlyPayment) {

    let totalInterestPaid = 0;
    let monthlyRate = apr / 12 / 100; // Monthly interest rate as a decimal
    const paymentDetails = [];

      let interestPaid = remainingBalance * monthlyRate;
      let principalPaid = monthlyPayment - interestPaid;
      remainingBalance -= principalPaid;
      totalInterestPaid += interestPaid;
  
      if (remainingBalance < 0) {
        remainingBalance = 0;
      }
  
      const monthDetails = {
        interestPaid: interestPaid.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
        remainingBalance: remainingBalance.toFixed(2),
        totalInterestPaid: totalInterestPaid.toFixed(2)
      };
      paymentDetails.push(monthDetails);
  
      if (remainingBalance <= 0) {
        paymentDetails.push({
          message: 'Balance fully paid off!',
        });
        
      }
    
  
    const jsonString = JSON.stringify(paymentDetails, null, 2);
    //console.log('Variable payment details JSON string:', jsonString);
    return jsonString;
  }





