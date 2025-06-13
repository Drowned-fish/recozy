import React from 'react';
import useCounterStore from './store';
import './index.css';

const Counter: React.FC = () => {
  const [state, methods] = useCounterStore.useUniqueState();

  return (
    <div className="counter">
      <div className="count">{state.count}</div>
      <div className="buttonGroup">
        <button 
          className="button increment"
          onClick={methods.increment}
        >
          +
        </button>
        <button 
          className="button decrement"
          onClick={methods.decrement}
        >
          -
        </button>
        <button 
          className="button reset"
          onClick={methods.reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;