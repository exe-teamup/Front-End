import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  // const [test, setTest] = useState(0);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8'>
      {/* Test custom colors */}
      <div className='mb-8 p-4 bg-background-card rounded-lg'>
        <h1 className='text-4xl font-bold text-text-title mb-2'>
          Custom Colors Test - Tailwind v4
        </h1>
        <p className='text-text-subtitle mb-4'>Subtitle with custom color</p>
        <div className='flex gap-4 mb-4'>
          <div className='w-16 h-16 bg-primary rounded'></div>
          <div className='w-16 h-16 bg-primary-blue rounded'></div>
          <div className='w-16 h-16 bg-primary-green rounded'></div>
          <div className='w-16 h-16 bg-error rounded'></div>
        </div>
        <div className='flex gap-4'>
          <button className='bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded'>
            Primary Button
          </button>
          <button className='bg-primary-blue hover:bg-primary-blue/90 text-white px-4 py-2 rounded'>
            Blue Button
          </button>
          <button className='bg-error hover:bg-error/90 text-white px-4 py-2 rounded'>
            Error Button
          </button>
        </div>
      </div>

      <h1 className='text-4xl font-bold text-text-title mb-8'>
        Vite + React + TypeScript + TailwindCSS
      </h1>

      <div className='bg-white p-8 rounded-lg shadow-lg mb-8'>
        <button
          onClick={() => setCount(count => count + 1)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200'
        >
          count is {count}
        </button>
        <p className='mt-4 text-primary'>
          Edit{' '}
          <code className='bg-gray-200 px-2 py-1 rounded'>src/App.tsx</code> and
          save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
