import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl">Counting App</h1>
      <div className="flex flex-row gap-5">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
          onClick={() => setCount(count => count - 1)}>
          -1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
          onClick={() => setCount(count => count + 1)}>
          +1
        </button>
      </div>
      <h3 className="text-lg">{count}</h3>
    </div>
  );
}

export default App;
