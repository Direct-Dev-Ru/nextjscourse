export default function TailwindPage() {
  return (
    <div className='container '>
      <div
        className={`grid grid-cols-4 gap-4 font-mono text-white text-sm text-center font-bold 
      leading-6 bg-stripes-fuchsia rounded-lg  min-h-screen py-2`}
      >
        <div className='p-4 rounded-lg shadow-lg bg-fuchsia-400'>01</div>
        <div className='p-4 rounded-lg shadow-lg bg-fuchsia-400'>02</div>
        <div className='p-4 rounded-lg shadow-lg bg-fuchsia-400'>03</div>
        <div className='p-4 rounded-lg shadow-lg bg-fuchsia-400'>04</div>
        <div className='p-4 rounded-lg shadow-lg bg-fuchsia-400'>05</div>
        <div className='p-4 rounded-lg shadow-lg bg-fuchsia-400'>06</div>
        <div className='p-4 rounded-lg shadow-lg bg-fuchsia-400'>07</div>
        <div className='p-4 rounded-lg shadow-lg bg-fuchsia-400'>08</div>
      </div>
    </div>
  );
}
