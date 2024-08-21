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

  function onAddTransaction(transaction) {
    setTransactions((transactions) => [...transactions, {...transaction, id: transactions.length + 1, currency: 'PLN'}]);
    setShowTransactionForm(false);
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
        onAddTransaction={onAddTransaction}
      />
      <Transactions transactions={transactions} />
    </div>
  );
}

function TransactionsHeader({onShowTransactionForm, showTransactionForm, onAddTransaction}) {
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
      {showTransactionForm && (
        <FormAddTransaction onAddTransaction={onAddTransaction} />
      )}
    </div>
  );
}

function FormAddTransaction({onAddTransaction}) {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [price, setPrice] = useState(0);

  function handleAddTransaction(e) {
    e.preventDefault();
    onAddTransaction({ title, label, price });
  }

  return (
    <form className='form-add-transaction'>
      <div className='container-add-transaction'>
        <span className='input-container'>
          <label>Title: </label>
          <input
            className='input'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </span>
        <span className='input-container'>
          <label>Label: </label>
          <input
            className='input'
            type='text'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </span>
        <span className='input-container'>
          <label>Price: </label>
          <input
            className='input'
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </span>
        <Button onClick={handleAddTransaction}>Add</Button>
      </div>
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
    <li className='transaction-item'>
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
