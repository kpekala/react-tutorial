import './styles.css';
import { useState } from 'react';

function App() {
  function roundToLegitPrice(value) {
    return (Math.round(value + Number.EPSILON) * 100) / 100;
  }

  const satisfactionMap = {
    'not-satisfied': 0,
    good: 0.1,
    perfect: 0.2,
  };

  const [bill, setBill] = useState(0);
  const [userSatisfaction, setUserSatisfaction] = useState('not-satisfied');
  const [friendSatisfaction, setFriendSatisfaction] = useState('not-satisfied');
  const tips = roundToLegitPrice(
    (satisfactionMap[userSatisfaction] + satisfactionMap[friendSatisfaction]) *
      bill
  );
  const fullBill = bill + tips;

  function reset() {
    setBill(0);
    setUserSatisfaction('not-satisfied');
    setFriendSatisfaction('not-satisfied');
  }
  return (
    <div>
      <BillInput
        text='How much was the bill?'
        onBillChange={setBill}
        bill={bill}
      />
      <SatisfactionInput
        onSatisfactionChange={setUserSatisfaction}
        satisfaction={userSatisfaction}
        text='How did you like the service?'
      />
      <SatisfactionInput
        onSatisfactionChange={setFriendSatisfaction}
        satisfaction={friendSatisfaction}
        text='How did your frien like the service?'
      />
      {bill > 0 && (
        <>
          <h2>
            You pay ${fullBill} (${bill} + ${tips})
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
}

function BillInput({ text, bill, onBillChange }) {
  return (
    <div>
      {text}
      <input
        value={bill}
        onChange={(e) => onBillChange(Number(e.target.value))}
      />
    </div>
  );
}

function SatisfactionInput({ text, satisfaction, onSatisfactionChange }) {
  return (
    <div>
      {text}
      <select
        onChange={(e) => onSatisfactionChange(e.target.value)}
        className='percentage-select'
        value={satisfaction}
      >
        <option value='not-satisfied'>Not satisfied (0%)</option>
        <option value='good'>It was kinda good (10%)</option>
        <option value='perfect'>It was perfect (20%)</option>
      </select>
    </div>
  );
}

export default App;
