import { useState } from 'react';

export function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(1);

  function handleSubmit(e) {
    if (!description) return;
    e.preventDefault();

    const newItem = {
      description,
      count,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);

    setDescription('');
    setCount(1);
  }
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={count} onChange={(e) => setCount(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
