import Link from 'next/link';
import classes from './Button.module.css';

const ErrorAlert = (props: any) => {
  return (
    <div className='bg-red-100 text-white px-4 py-3 rounded relative' role='alert'>
      <div className='bg-red-600 py-3'>
        <strong className='font-bold'>{props.title}</strong>
        <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
          <svg
            className='fill-current h-6 w-6 text-white'
            role='button'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            onClick={props.onClickHandler}
          >
            <title>Close</title>
            <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
          </svg>
        </span>
      </div>
      <div className=' rounded-b bg-red-100 px-4 py-3 text-red-700'>
        <p>{props.error}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;
