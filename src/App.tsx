import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8'>
      <div className='flex gap-8 mb-8'>
        <a
          href='https://vite.dev'
          target='_blank'
          rel='noopener noreferrer'
          className='transition-transform hover:scale-110'
        >
          <img
            src={viteLogo}
            className='h-20 w-20 animate-spin'
            alt='Vite logo'
            style={{ animationDuration: '20s' }}
          />
        </a>
        <a
          href='https://react.dev'
          target='_blank'
          rel='noopener noreferrer'
          className='transition-transform hover:scale-110'
        >
          <img
            src={reactLogo}
            className='h-20 w-20 animate-spin'
            alt='React logo'
            style={{ animationDuration: '20s' }}
          />
        </a>
      </div>

      <h1 className='text-4xl font-bold text-gray-800 mb-8'>
        Vite + React + TypeScript + TailwindCSS
      </h1>

      <div className='bg-white p-8 rounded-lg shadow-lg mb-8'>
        <button
          onClick={() => setCount(count => count + 1)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200'
        >
          count is {count}
        </button>
        <p className='mt-4 text-gray-600'>
          Edit{' '}
          <code className='bg-gray-200 px-2 py-1 rounded'>src/App.tsx</code> and
          save to test HMR
        </p>
      </div>

      <p className='text-gray-500 text-center max-w-md'>
        Click on the Vite and React logos to learn more. This project is set up
        with TypeScript, TailwindCSS, ESLint, and Prettier.
      </p>
    </div>
  );
}

export default App;
