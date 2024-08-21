import { useState } from 'react';
import './styles.css';

export default function App() {
  const [transactions, setTransactions] = useState([
    {
      title: 'Netflix',
      label: '🍿Streaming',
      price: -18,
      currency: 'PLN',
      id: 1,
    },
  ]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  function handleShowTransactionForm() {
    setShowTransactionForm((show) => !show);
  }

  const expenses = transactions
    .filter((transaction) => transaction.price < 0)
    .reduce((partialSum, a) => partialSum - a.price, 0);

  const income = transactions
    .filter((transaction) => transaction.price > 0)
    .reduce((partialSum, a) => partialSum + a.price, 0);

  return (
    <div className='app-container'>
      <h2 className='summary'>Summary</h2>
      <MoneySummary money={income - expenses} text='Net Total' currency='PLN' />
      <SummaryList
        income={income}
        expenses={expenses}
        investment={100}
        savings={50}
        currency={'PLN'}
      />
      <TransactionsHeader
        onShowTransactionForm={handleShowTransactionForm}
        showTransactionForm={showTransactionForm}
      />
      <Transactions transactions={transactions} />
    </div>
  );
}

function TransactionsHeader({ onShowTransactionForm, showTransactionForm }) {
  return (
    <div>
      <div className='transactions-header'>
        <p className='transactions-title'>Transactions</p>
        <div className='buttons-group'>
          <Button onClick={() => onShowTransactionForm()}>
            {!showTransactionForm ? '+ Add transaction' : 'Close'}
          </Button>
          <Button>+ Add label</Button>
        </div>
      </div>
      {showTransactionForm && <FormAddTransaction />}
    </div>
  );
}

function FormAddTransaction(onAddTransaction) {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [price, setPrice] = useState(0);

  return (
    <form className='form-add-transaction'>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
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
        <Transaction transaction={transaction} key={transaction.id} />
      ))}
    </ul>
  );
}

function Transaction({ transaction }) {
  return (
    <li>
      <div className='transaction'>
        <span>{transaction.title}</span>
        <span className='label'>{transaction.label}</span>
        <span>
          {transaction.currency === '$' ? '$' : ''}
          {transaction.price}
          {transaction.currency !== '$' ? transaction.currency : ''}
        </span>
      </div>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}
