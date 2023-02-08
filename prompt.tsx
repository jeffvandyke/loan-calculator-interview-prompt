import * as React from "react";
import LoanRow from "./LoanRow";
import { FieldTitle, InputField, ReadOnlyField } from "form-library";


/* Exercise:
 *
 * You have an interactive <LoanComparisonPage /> component that manages
 * its own state internally, and side-by-side, you have a list of various
 * loans options from different loan providers. The calculator is a standard
 * loan payment calculator, allowing a user to see what their monthly payment
 * would be.
 *
 * Currently, the calc button does nothing, and the calculator inputs need to
 * be filled in manually to allow the user to plan different scenarios based on
 * which loan they choose.
 *
 * How would you implement a new button on each loan option that fills in the
 * calculator with the amount and interest rate from the loan whose button is
 * clicked on?
 */

type ApiLoan = {
  title: string;
  amount: number;
  interestPct: number;
  termMonths: number;
  monthlyPayment: number;
}

function useLoans() {
  const loans: ApiLoan[] = [
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

// ---- Loan List panel --------------------------------------------------------

function LoanRow({ loan }: { loan: ApiLoan }) {
  return <div>
    {loan.title}
    {loan.amount}
    {/* ... other loan details ... */}
    <button /* TODO: onClick={} */>Calc</button>
  </div>
}

function LoanList({ loans }: { loans: ApiLoan[] }) {
  return (
    <div>
      {loans.map((loan) => (
        <LoanRow
          key={`${loan.title}-${loan.term}-${loan.amount}`}
          loan={loan}
        />
      ))}
    </div>
  );
}

// ---- Loan Calculator --------------------------------------------------------

const LoanCalculator = () => {
  //More is needed here
  const [calcInputs, setCalcInputs] = useState({
    amount: 1000,
    interestRate: 3,
    // ... other fields,
    extraInitialPayment: 0,
    extraMonthlyPayment: 0,
  });

  const handleChange = React.useCallback(({ currentTarget: { name, value } }) => {
    setCalcInputs((s) => ({ ...s, [name]: value }));
  }, []);

  const calcResult = calculateTotalPayment(calcInputs);

  return (
    <div>
      <div>
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

        <FieldTitle>Loan Duration (Term)</FieldTitle>
        <ReadonlyField value={formatDuration(calcResult.duration)} />

        <FieldTitle>Monthly Payment</FieldTitle>
        <ReadonlyField value={formatDollars(calcResult.monthlyPayment)} />

        <FieldTitle>Total Payment</FieldTitle>
        <ReadonlyField value={formatDollars(calcResult.totalPayment)} />
      </div>
    </div>
  );
};
