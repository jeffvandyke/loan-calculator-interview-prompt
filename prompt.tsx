import * as React from "react";
import LoanRow from "./LoanRow";
import { FieldTitle, InputField, ReadOnlyField } from "form-library";

function useLoans() {
  const loans = [
    {
      title: "PNC Bank",
      amount: 3000,
      interestPct: 4.5,
      termMonths: 24,
      monthlyPayment: 78.24,
    },
    {
      title: "Comerica Bank",
      amount: 4500,
      interestPct: 4,
      termMonths: 18,
      monthlyPayment: 132.39,
    },
    // ...
  ];
  return { loans };
}

export default function LoanComparisonPage() {
  const { loans } = useLoans();

  return (
    <>
      <LoanList loans={loans} />
      <LoanCalculator />
    </>
  );
}

function LoanList({ loans }) {
  return (
    <div className="panel">
      {loans.map((loan) => (
        <LoanRow
          loan={loan}
          key={`${loan.title}-${loan.term}-${loan.amount}`}
        />
      ))}
    </div>
  );
}

const LoanCalculator = () => {
  //More is needed here
  const [calcInputs, setCalcInputs] = useState({
    amount: 1000,
    interestRate: 3,
    // ... other fields,
    extraPayment: 0,
  });

  const handleChange = React.useCallback((event) => {
    setCalcInputs((s) => ({ ...s, [event.target.name]: event.target.value }));
  });

  const calcResult = calculateTotalPayment(calcInputs);

  return (
    <div className="panel">
      <div className="calculatorForm">
        <FieldTitle>Loan Amount</FieldTitle>
        <InputField
          name="amount"
          value={calcInputs.amount}
          onChange={handleChange}
        />

        <FieldTitle>Interest Rate</FieldTitle>
        <InputField
          name="interestRate"
          value={calcInputs.interestRate}
          onChange={handleChange}
        />

        {/* ... other inputs ... */}

        <FieldTitle>Monthly Payment</FieldTitle>
        <ReadonlyField value={formatDollars(calcResult.monthlyPayment)} />

        <FieldTitle>Total Payment</FieldTitle>
        <ReadonlyField value={formatDollars(calcResult.totalPayment)} />
      </div>
    </div>
  );
};
