import './index.css';
import { useEffect, useState } from 'react';

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [inputValue, setInputValue] = useState(100);
  const [fromValue, setFromValue] = useState('USD');
  const [toValue, setToValue] = useState('EUR');
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchConvertedValue() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${inputValue}&from=${fromValue}&to=${toValue}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setConvertedValue(data.rates[toValue]);
      } catch (error) {}
    }

    fetchConvertedValue();

    return () => {
      controller.abort();
    };
  }, [inputValue, fromValue, toValue]);

  return (
    <div>
      <input
        type='number'
        value={inputValue.toString()}
        onChange={(e) => setInputValue(Number(e.target.value))}
      />
      <select value={fromValue} onChange={(e) => setFromValue(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={toValue} onChange={(e) => setToValue(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>
        {convertedValue} {toValue}
      </p>
    </div>
  );
}
