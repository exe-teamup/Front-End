import { useParams } from 'react-router-dom';

export function GroupDetail() {
  const { id } = useParams();

  return (
    <div className='max-w-6xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold mb-4'>Group Detail</h1>
      <p>Detail for group: {id}</p>
    </div>
  );
}
