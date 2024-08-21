import { useState } from 'react';
import '../src/styles.css';
import { Button } from './App';

export function FormAddLabel({ onAddLabel }) {
  const [label, setLabel] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if(label === '')
      return;
    onAddLabel(label);
  }
  return (
    <form className='form-add-label' onSubmit={handleSubmit}>
      <div className='add-label-container'>
        <span className='input-container'>
          <label>Label: </label>
          <input
            className='input'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </span>
        <Button type='submit'>+ Add label</Button>
      </div>
    </form>
  );
}
