import React from 'react';
import Counter from './basic/counter';
import ShoppingApp from './advanced/shopping';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">Recozy Demo</h1>
      <section className="section">
        <h2 className="sectionTitle">Counter Example</h2>
        <Counter />
      </section>
      <section className="section">
        <h2 className="sectionTitle">shopping Example</h2>
        <ShoppingApp />
      </section>
    </div>
  );
};

export default App;