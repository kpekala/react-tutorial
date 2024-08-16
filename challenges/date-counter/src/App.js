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

  function onAddStepClick() {
    setStep((currentStep) => currentStep + 1);
  }

  function onDecrementStepClick() {
    setStep((currentStep) => currentStep - 1);
  }

  function onAddCountClick() {
    setCount((currentCount) => currentCount + step);
  }

  function onDecrementCountClick() {
    setCount((currentCount) => currentCount - step);
  }

  return (
    <div>
      <h1>Super date counter!</h1>
      <Picker
        title='Step'
        difference={step}
        onAddClick={onAddStepClick}
        onMinusClick={onDecrementStepClick}
      />
      <Picker
        title='Count'
        difference={count}
        onAddClick={onAddCountClick}
        onMinusClick={onDecrementCountClick}
      />
      <NewDate diffInDays={count} />
    </div>
  );
}

function Picker({ title, difference, onAddClick, onMinusClick }) {
  return (
    <div>
      <button className='picker-btn' onClick={onMinusClick}>
        <span className='material-symbols-outlined'>remove</span>
      </button>
      <span className='picker-text'>
        {title}: {difference}
      </span>
      <button className='picker-btn' onClick={onAddClick}>
        <span className='material-symbols-outlined'>add</span>
      </button>
    </div>
  );
}

function NewDate({ diffInDays }) {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + diffInDays);
  const text = diffInDays > 0 ? 'from' : 'before';

  return (
    <div>
      {`${Math.abs(
        diffInDays
      )} days ${text} today is ${newDate.toDateString()}`}
    </div>
  );
}
