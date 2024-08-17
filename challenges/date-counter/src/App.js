import { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <div className='app'>
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function onAddCountClick() {
    setCount((currentCount) => currentCount + Number(step));
  }

  function onDecrementCountClick() {
    setCount((currentCount) => currentCount - Number(step));
  }

  return (
    <div>
      <h1>Super date counter!</h1>
      <div>
        <input
          type='range'
          min={1}
          max={20}
          value={step}
          onChange={(e) => setStep(e.target.value)}
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={onDecrementCountClick}>-</button>
        <input
          className='picker-text'
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={onAddCountClick}>+</button>
      </div>

      <NewDate diffInDays={Number(count)} />
    </div>
  );
}

function NewDate({ diffInDays }) {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + diffInDays);
  const text =
    diffInDays > 0
      ? `${Math.abs(diffInDays)} days from today`
      : diffInDays === 0
      ? 'Today'
      : `${Math.abs(diffInDays)} days before today`;

  return <div>{`${text} is ${newDate.toDateString()}`}</div>;
}
