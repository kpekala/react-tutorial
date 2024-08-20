import { useState } from 'react';
import './styles.css';

export default function App() {
  const [transactions, setTransactions] = useState([
    { title: 'Netflix', label: 'Straming', price: -18, currency: 'PLN', id: 1 },
  ]);

  const expenses = transactions
    .filter((transaction) => transaction.price < 0)
    .reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div className='app-container'>
      <h2 className='summary'>Summary</h2>
      <MoneySummary money={2137} text='Net Total' currency='PLN' />
      <SummaryList
        income={2000}
        expenses={expenses}
        investment={100}
        savings={50}
        currency={'PLN'}
      />
      <Transactions transactions={transactions} />
    </div>
  );
}

function SummaryList({ income, expenses, investment, savings, currency }) {
  return (
    <div className='summary-list'>
      <MoneySummary
        money={income}
        text='Income'
        currency={currency}
        color='#36a74f'
      />
      <MoneySummary
        money={expenses}
        text='Expenses'
        currency={currency}
        color='#d45e4d'
      />
      <MoneySummary
        money={investment}
        text='Investment'
        currency={currency}
        color='#5d48dc'
      />
      <MoneySummary
        money={savings}
        text='Savings'
        currency={currency}
        color='#f4b511'
      />
    </div>
  );
}

function MoneySummary({ money, text, currency, color }) {
  return (
    <span>
      <h3 style={{ color }}>{text}</h3>
      <p>
        {currency === '$' ? '$' : ''} {money} {currency !== '$' ? currency : ''}
      </p>
    </span>
  );
}

function Transactions({ transactions }) {
  return (
    <ul className='transactions'>
      {transactions.map((transaction) => (
        <Transaction transaction={transaction} />
      ))}
    </ul>
  );
}

function Transaction({ transaction }) {
  return (
    <li key={transaction.id}>
      <div className='transaction'>
        <span>{transaction.title}</span>
        <span>{transaction.label}</span>
        <span>{Math.abs(transaction.price)}</span>
      </div>
    </li>
  );
}
