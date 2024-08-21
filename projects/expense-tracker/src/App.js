import { useState } from 'react';
import './styles.css';
import { FormAddLabel } from './FormAddLabel';

function initData() {
  let mockLabels = ['🍿Streaming', '📈Investments', '🪙Savings'];
  let initialLabels = localStorage.getItem('labels')?.split(',') ?? mockLabels;
  let initialTransactions = JSON.parse(
    localStorage.getItem('transactions') ?? '[]'
  );
  return [initialLabels, initialTransactions];
}

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [labels, setLabels] = useState([]);

  function onAddTransaction(transaction) {
    setTransactions((transactions) => [
      ...transactions,
      { ...transaction, id: transactions.length + 1, currency: 'PLN' },
    ]);
  }

  function handleExport() {
    localStorage.setItem('labels', labels);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  function handleImport() {
    let [initialLabels, savedTransactions] = initData();
    setLabels(initialLabels);
    setTransactions(savedTransactions);
  }

  function handleClear() {
    localStorage.clear();
    setLabels([]);
    setTransactions([]);
  }

  function onAddLabel(label) {
    setLabels((labels) => [...labels, label]);
  }

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((partialSum, a) => partialSum - a.price, 0);

  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((partialSum, a) => partialSum + a.price, 0);

  const investment = transactions
    .filter((transaction) => transaction.type === 'investment')
    .reduce((partialSum, a) => partialSum + a.price, 0);

  const savings = transactions
    .filter((transaction) => transaction.type === 'savings')
    .reduce((partialSum, a) => partialSum + a.price, 0);

  return (
    <div className='app-container'>
      <h2 className='summary'>Summary</h2>
      <span className='export-container'>
        <Button onClick={handleExport}>Save</Button>
        <Button onClick={handleImport}>Load</Button>
        <Button onClick={handleClear}>Clear</Button>
      </span>
      <MoneySummary money={income - expenses} text='Net Total' currency='PLN' />
      <SummaryList
        income={Number(income)}
        expenses={Number(expenses)}
        investment={investment}
        savings={savings}
        currency={'PLN'}
      />
      <TransactionsHeader
        onAddTransaction={onAddTransaction}
        labels={labels}
        onAddLabel={onAddLabel}
      />
      <Transactions transactions={transactions} />
    </div>
  );
}

function TransactionsHeader({ onAddTransaction, labels, onAddLabel }) {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showLabelForm, setShowLabelForm] = useState(false);

  function handleToggleTransactionForm(show) {
    setShowTransactionForm(show);
    if (show) setShowLabelForm(false);
  }

  function handleToggleLabelForm(show) {
    setShowLabelForm(show);
    if (show) setShowTransactionForm(false);
  }

  function handleAddPanel(label) {
    onAddLabel(label);
    setShowLabelForm(false);
  }

  function handleAddTransaction(transaction) {
    onAddTransaction(transaction);
    setShowTransactionForm(false);
  }

  return (
    <div>
      <div className='transactions-header'>
        <p className='transactions-title'>Transactions</p>
        <div className='buttons-group'>
          <Button
            onClick={() => handleToggleTransactionForm(!showTransactionForm)}
          >
            {!showTransactionForm ? '+ Add transaction' : 'Close'}
          </Button>
          <Button onClick={() => handleToggleLabelForm(!showLabelForm)}>
            {!showLabelForm ? '+ Add label' : 'Close'}
          </Button>
        </div>
      </div>
      {showTransactionForm && (
        <FormAddTransaction
          onAddTransaction={handleAddTransaction}
          labels={labels}
        />
      )}
      {showLabelForm && <FormAddLabel onAddLabel={handleAddPanel} />}
    </div>
  );
}

function FormAddTransaction({ onAddTransaction, labels }) {
  console.log(labels);
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState(labels ? labels[0] : '');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('expense');

  function handleAddTransaction(e) {
    e.preventDefault();
    onAddTransaction({
      title,
      label,
      price: type === 'expense' ? -price : price,
      type,
    });
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
          <select
            className='input'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          >
            {labels.map((label, index) => (
              <option value={label} key={index}>
                {label}
              </option>
            ))}
          </select>
        </span>
        <span className='input-container'>
          <label>Price: </label>
          <input
            className='input'
            type='text'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </span>
        <span className='input-container'>
          <label>Type: </label>
          <select
            className='input'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
            <option value='investment'>Investment</option>
            <option value='savings'>Savings</option>
          </select>
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
        <span className='left'>{transaction.title}</span>
        <span className='label'>{transaction.label}</span>
        <span className='right'>
          {transaction.currency === '$' ? '$' : ''}
          {transaction.price}
          {transaction.currency !== '$' ? transaction.currency : ''}
        </span>
      </div>
    </li>
  );
}
export function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}
